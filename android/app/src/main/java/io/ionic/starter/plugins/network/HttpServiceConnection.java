package io.ionic.starter.plugins.network;

import android.content.Context;
import android.content.res.Resources;
import android.os.AsyncTask;

import com.getcapacitor.PluginCall;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.UnknownHostException;

import javax.net.ssl.HttpsURLConnection;

import io.ionic.starter.MainActivity;
import io.ionic.starter.R;
import io.ionic.starter.plugins.AsyncResponse;
import io.ionic.starter.utility.Errors;
import io.ionic.starter.utility.Logger;
import io.ionic.starter.utility.Util;

public class HttpServiceConnection extends AsyncTask<String, String, String> {

  private static final String CLASS_NAME = "HttpServiceConnection.java";
  private static final String CONNECT_METHOD = "connect";

  private final Context appContext;
  private final MainActivity mActivity;
  private final Resources res;
  private final PluginCall callbackContext;

  private HttpsURLConnection connection;
  private String response;
  private String key;
  public AsyncResponse delegate = null;

  public HttpServiceConnection(Resources res, Context context, PluginCall callbackContext) {
    this.res = res;
    this.appContext = context;
    this.mActivity = (MainActivity) context;
    this.callbackContext = callbackContext;
  }

  @Override
  protected String doInBackground(String... params) {
    try {
      sendRequest(params[0], params[1]);
    } catch (Exception e) {
      Logger.log(e.getClass().getName(), e.toString(), CLASS_NAME, CONNECT_METHOD);
    }
    return response;
  }

  @Override
  protected void onPostExecute(String result) {
    super.onPostExecute(result);
    if (!Util.isNetworkAvailable(mActivity)) {
      setError(R.string.networkFailCode, R.string.networkFailMsg);
    }
    delegate.processFinish(key, result, callbackContext);
  }

  private void sendRequest(String url, String args) throws IOException {
//    String envKeyName = apiKey.contains("MessageInfoGet") || apiKey.contains("MessageValidate")
//        ? "Env_" + Constants.COUNTRY_CODE + Constants.ENV + "NOT"
//        : "Env_" + Constants.COUNTRY_CODE + Constants.ENV;
//
//    int envKeyRes = res.getIdentifier(envKeyName, Constants.TYPE_STRING, MainActivity.PACKAGE_NAME);
//    int urlKeyRes = res.getIdentifier(apiKey, Constants.TYPE_STRING, MainActivity.PACKAGE_NAME);
//    key = res.getString(envKeyRes) + res.getString(urlKeyRes);
//    Logger.logtxt("url",key);
//    Logger.log("UrlKey", key, CLASS_NAME, "sendRequest");
//    Logger.log("Request", args, CLASS_NAME, "sendRequest");

    try {
      // ssl pinning ON/OFF
      // MyTrustManager myTrustManager = new MyTrustManager(this.mActivity, key);
      // HttpsURLConnection.setDefaultSSLSocketFactory(myTrustManager.getSocketFactory());
      connection = (HttpsURLConnection) new URL(url).openConnection();
      connection.setConnectTimeout(65000);
      connection.setReadTimeout(65000);
      connection.setRequestMethod("POST");
      connection.setRequestProperty("Content-Type", "application/json");
      connection.setRequestProperty("Accept", "application/json");
      connection.setDoOutput(true);
      connection.setDoInput(true);
      connection.connect();

      connect(args);

    } catch (MalformedURLException | UnknownHostException e) {
      setError(R.string.invalidActionCode, R.string.invalidActionMsg);
      logError(e);
    } catch (IOException e) {
      setError(R.string.conFailCode, R.string.conFailMsg);
      logError(e);
    } catch (Exception e) {
      setError(R.string.invalidActionCode, R.string.invalidActionMsg);
      logError(e);
    } finally {
      if (connection != null) {
        connection.disconnect();
      }
    }
  }

  private void connect(String args) throws IOException {
    if (args == null || args.isEmpty()) {
      setError(R.string.invalidActionCode, R.string.invalidActionMsg);
      Logger.log("Service request error", "No request data found", CLASS_NAME, CONNECT_METHOD);
      return;
    }

    try (OutputStream os = connection.getOutputStream()) {
      os.write(args.getBytes());
      os.flush();
    }

    int responseCode = connection.getResponseCode();
    if (responseCode == HttpsURLConnection.HTTP_OK) {
      response = readInputStream(connection.getInputStream());
    } else {
      setError(R.string.conFailCode, R.string.conFailMsg);
      Logger.log("Service response error", "HTTP response code: " + responseCode, CLASS_NAME, CONNECT_METHOD);
    }
  }

  private String readInputStream(InputStream stream) throws IOException {
    try (BufferedReader reader = new BufferedReader(new InputStreamReader(stream))) {
      StringBuilder builder = new StringBuilder();
      String line;
      while ((line = reader.readLine()) != null) {
        builder.append(line);
      }
      return builder.toString();
    }
  }

  private void setError(int codeResId, int msgResId) {
    Errors.getInstance().setCode(res.getString(codeResId));
    Errors.getInstance().setErrorMsg(res.getString(msgResId));
  }

  private void logError(Exception e) {
    Logger.log(e.getClass().getName(), e.toString(), CLASS_NAME, CONNECT_METHOD);
  }
}


