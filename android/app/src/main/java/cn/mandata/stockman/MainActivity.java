package cn.mandata.stockman;

import android.content.Intent;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.view.KeyEvent;

import com.facebook.react.BuildConfig;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.shell.MainReactPackage;
import com.smixx.reactnativeicons.IconFont;
import com.smixx.reactnativeicons.ReactNativeIcons;

import java.util.Arrays;
import java.util.List;

import cn.mandata.react_native_android_lib.ManDataLibPackage;
import cn.mandata.react_native_android_lib.umeng.UmengLogin;
import cn.mandata.react_native_mpchart.MPChartPackage;
import cn.mandata.react_native_voise.BaiduVoiseLibPackage;

public class MainActivity extends ReactActivity {


//    @Override
//    public void onActivityResult(int requestCode, int resultCode, Intent data) {
//        super.onActivityResult(requestCode, resultCode, data);
//        UmengLogin.onActivityResult(requestCode, resultCode, data);
//    }
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "stock";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return  true;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new ReactNativeIcons(Arrays.asList(
                        new IconFont("typicons", "typicons.ttf"),
                        new IconFont("fontawesome", "FontAwesome.otf")
                )),
                new MPChartPackage(),
                new ManDataLibPackage(),
                new BaiduVoiseLibPackage()
        );
    }

    @Override
    public void onBackPressed() {
        this.onKeyUp(KeyEvent.KEYCODE_MENU,new KeyEvent(KeyEvent.ACTION_DOWN,KeyEvent.KEYCODE_MENU));
    }


}
