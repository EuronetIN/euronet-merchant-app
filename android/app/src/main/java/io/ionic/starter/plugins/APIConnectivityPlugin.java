package io.ionic.starter.plugins;

import android.content.res.Resources;
import android.text.TextUtils;

import androidx.annotation.NonNull;

import io.ionic.starter.MainActivity;
import io.ionic.starter.R;
import io.ionic.starter.plugins.network.HttpServiceConnection;
import io.ionic.starter.utility.Errors;
import io.ionic.starter.utility.Logger;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import org.json.JSONException;


@CapacitorPlugin(name = "APIConnectivity")
public class APIConnectivityPlugin extends Plugin implements AsyncResponse {
  private MainActivity mActivity;
  private String urlKey;
  private String parmObject;
  private Resources mRes;

  @Override
  public void load() {
    mActivity = (MainActivity) bridge.getActivity();
    mRes = mActivity.getResources();
  }

  @PluginMethod()
  public void request(@NonNull PluginCall call) {
    JSObject args = call.getData();
    urlKey = args.getString("url");
    parmObject = args.getString("parameter");

    Errors.getInstance().setCode(null);
    Errors.getInstance().setErrorMsg(null);

    HttpServiceConnection httpService = new HttpServiceConnection(mRes, mActivity, call);
    httpService.delegate = this;

    bridge.execute(() -> httpService.execute(new String[]{urlKey, parmObject}));
  }

  @Override
  public void processFinish(String url, String response, PluginCall call) {

    String errorCode = Errors.getInstance().getCode();
    String errorMsg = Errors.getInstance().getErrorMsg();

    if (!TextUtils.isEmpty(response)) {
      Logger.log("Response", response, getClass().getName(), "processFinish");
    }

    if (errorCode != null) {
      call.reject(errorMsg, errorCode);
      return;
    }

    if (TextUtils.isEmpty(response)) {
      call.reject(mRes.getString(R.string.responseNullMsg), mRes.getString(R.string.responseNullCode));
      return;
    }

    try {
      JSObject jsObj = new JSObject(response);

      JSObject result = new JSObject();
      result.put("data", jsObj.toString());
      call.resolve(result);

    } catch (JSONException e) {
      call.reject("Invalid JSON in response: " + e.getMessage());
    }
  }
}





