package com.longbui.i2p;

import android.app.Activity;
import android.content.ClipData;
import android.content.ContentValues;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class MainActivity extends Activity {
    private static final int REQUEST_IMAGE_PICK = 4102;
    private WebView webView;
    private ValueCallback<Uri[]> fileChooserCallback;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setStatusBarColor(0xFF102D3A);
        getWindow().setNavigationBarColor(0xFF102D3A);

        webView = new WebView(this);
        webView.setBackgroundColor(0xFFF3F6F7);
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setAllowFileAccess(true);
        webSettings.setAllowContentAccess(true);
        webSettings.setSupportZoom(false);
        webSettings.setBuiltInZoomControls(false);
        webSettings.setDisplayZoomControls(false);
        webSettings.setLoadsImagesAutomatically(true);
        webSettings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        webSettings.setJavaScriptCanOpenWindowsAutomatically(false);

        webView.addJavascriptInterface(new I2PBridge(), "I2PAndroid");
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return !"file".equalsIgnoreCase(request.getUrl().getScheme());
            }
        });
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> callback, FileChooserParams params) {
                if (fileChooserCallback != null) fileChooserCallback.onReceiveValue(null);
                fileChooserCallback = callback;
                Intent pickIntent = new Intent(Intent.ACTION_GET_CONTENT);
                pickIntent.addCategory(Intent.CATEGORY_OPENABLE);
                pickIntent.setType("image/*");
                pickIntent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                pickIntent.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true);
                Intent chooser = Intent.createChooser(pickIntent, "Chọn ảnh cho I2P");
                try {
                    startActivityForResult(chooser, REQUEST_IMAGE_PICK);
                } catch (Exception exception) {
                    fileChooserCallback = null;
                    callback.onReceiveValue(null);
                    Toast.makeText(MainActivity.this, "Không thể mở thư viện ảnh.", Toast.LENGTH_SHORT).show();
                }
                return true;
            }
        });

        setContentView(webView);
        webView.loadUrl("file:///android_asset/www/index.html");
        WebView.setWebContentsDebuggingEnabled(false);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode != REQUEST_IMAGE_PICK || fileChooserCallback == null) return;
        Uri[] results = null;
        if (resultCode == RESULT_OK && data != null) {
            ClipData clipData = data.getClipData();
            if (clipData != null && clipData.getItemCount() > 0) {
                List<Uri> uris = new ArrayList<>();
                for (int i = 0; i < clipData.getItemCount(); i++) {
                    Uri uri = clipData.getItemAt(i).getUri();
                    if (uri != null) uris.add(uri);
                }
                results = uris.toArray(new Uri[0]);
            } else if (data.getData() != null) {
                results = new Uri[]{data.getData()};
            }
        }
        fileChooserCallback.onReceiveValue(results);
        fileChooserCallback = null;
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) webView.goBack();
        else super.onBackPressed();
    }

    @Override
    protected void onDestroy() {
        if (fileChooserCallback != null) {
            fileChooserCallback.onReceiveValue(null);
            fileChooserCallback = null;
        }
        if (webView != null) {
            webView.removeJavascriptInterface("I2PAndroid");
            webView.destroy();
            webView = null;
        }
        super.onDestroy();
    }

    private class I2PBridge {
        @JavascriptInterface
        public boolean savePdf(String base64Pdf, String requestedName) {
            try {
                String filename = sanitizeFilename(requestedName);
                byte[] pdfBytes = android.util.Base64.decode(base64Pdf, android.util.Base64.DEFAULT);
                ContentValues values = new ContentValues();
                values.put(MediaStore.MediaColumns.DISPLAY_NAME, filename);
                values.put(MediaStore.MediaColumns.MIME_TYPE, "application/pdf");
                values.put(MediaStore.MediaColumns.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS + "/I2P");
                values.put(MediaStore.MediaColumns.IS_PENDING, 1);

                Uri destination = getContentResolver().insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, values);
                if (destination == null) return false;
                try (OutputStream output = getContentResolver().openOutputStream(destination, "w")) {
                    if (output == null) throw new IllegalStateException("Cannot open destination");
                    output.write(pdfBytes);
                    output.flush();
                }
                ContentValues published = new ContentValues();
                published.put(MediaStore.MediaColumns.IS_PENDING, 0);
                getContentResolver().update(destination, published, null, null);
                runOnUiThread(() -> Toast.makeText(MainActivity.this, "Đã lưu PDF trong Downloads/I2P", Toast.LENGTH_LONG).show());
                return true;
            } catch (Exception exception) {
                runOnUiThread(() -> Toast.makeText(MainActivity.this, "Lưu PDF thất bại. Vui lòng thử lại.", Toast.LENGTH_LONG).show());
                return false;
            }
        }

        private String sanitizeFilename(String input) {
            String name = input == null ? "i2p-document.pdf" : input;
            name = name.replaceAll("[^a-zA-Z0-9._ -]", "_").trim();
            if (name.isEmpty()) name = "i2p-document.pdf";
            if (!name.toLowerCase(Locale.ROOT).endsWith(".pdf")) name += ".pdf";
            return name;
        }
    }
}
