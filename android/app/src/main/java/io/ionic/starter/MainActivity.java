package io.ionic.starter;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

import io.ionic.starter.plugins.APIConnectivityPlugin;

public class MainActivity extends BridgeActivity {
  public static MainActivity mainActivity;


  @Override
  public void onCreate(Bundle savedInstanceState) {
    registerPlugin(APIConnectivityPlugin.class);
    super.onCreate(savedInstanceState);
  }
}
