package com.pschedoproject;


import com.facebook.react.ReactActivity;
import com.facebook.react.modules.core.PermissionListener; // <- add this import
public class MainActivity extends ReactActivity {
  @Override
  protected String getMainComponentName() {
    return "PschedoProject";
  }

  @Override
  public void onPointerCaptureChanged(boolean hasCapture) {}
}
