package io.ionic.starter.utility;

import android.util.Log;

import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Logger {
    private static final String dateTimeFormat = "MM/dd/yyyy hh:mm:ss:SS aa";
    private static FileOutputStream fout;







    public static void log(String exceptionName, String exceptionResion, String className, String methodName) {
        String date = (new SimpleDateFormat(dateTimeFormat)).format(new Date());
        StringBuilder logData = new StringBuilder("Date: ");
        logData.append(date);
        logData.append("\r ");
        logData.append("Class: ");
        logData.append(className);
        logData.append("\r ");
        logData.append("Method Name: ");
        logData.append(methodName);
        logData.append("\r ");
        logData.append("Exception Name: ");
        logData.append(exceptionName);
        logData.append("\r ");
        logData.append("Exception Reason: ");
        logData.append(exceptionResion);
        logData.append("\r ");
        logData.append("Device Model: ");
        logData.append(Util.getDeviceName());
        logData.append("\r ");
        logData.append("Device OS: ");
        logData.append(Util.getOS());
        logData.append("\n\r");
        Log.d("AUFLOG", logData.toString());
//        createFile();
//
//        try {
//            fout.write(logData.toString().getBytes(), 0, logData.toString().length());
//            fout.close();
//            return;
//        } catch (IOException e) {
//            e.printStackTrace();
//            return;
//        } catch (Exception paramString1) {
//            paramString1.printStackTrace();
//        }
    }


    public static void logtxt(String key , String val) {
        String date = (new SimpleDateFormat(dateTimeFormat)).format(new Date());
        StringBuilder logData = new StringBuilder("Date: ");
        logData.append(date);
        logData.append("\r ");
        logData.append(key);
        logData.append(Util.getDeviceName());
        logData.append("\r ");
        logData.append(val);
        logData.append(Util.getOS());
        logData.append("\n\r");
//        Log.d("AUFLOG", logData.toString());
//        createFile();
//
//        try {
//            fout.write(logData.toString().getBytes(), 0, logData.toString().length());
//            fout.close();
//            return;
//        } catch (IOException e) {
//            e.printStackTrace();
//            return;
//        } catch (Exception paramString1) {
//            paramString1.printStackTrace();
//        }
    }


  public static void onlyLog(String str) {

    // String date = (new SimpleDateFormat(dateTimeFormat)).format(new Date());
    StringBuilder logData = new StringBuilder("MerchantLOGS: ");
    logData.append("SOP: ");
    logData.append(str);
    logData.append("\n\r");
    Log.d("Merchant", logData.toString());
    //createFile();

//    try {
//      fout.write(logData.toString().getBytes(), 0, logData.toString().length());
//      fout.close();
//      return;
//    } catch (IOException e) {
//      ;
//      return;
//    }
        /*catch (Exception paramString1) {
            paramString1.printStackTrace();
        }*/
  }
}
