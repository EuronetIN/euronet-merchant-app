package io.ionic.starter.utility;

public class Errors {
   static Errors _instance;
   private String m_code;
   private String m_errorMsg;

   public static Errors getInstance() {
      if (_instance == null) {
         _instance = new Errors();
      }

      return _instance;
   }

   public String getCode() {
      return this.m_code;
   }

   public String getErrorMsg() {
      return this.m_errorMsg;
   }

   public void setCode(String var1) {
      this.m_code = var1;
   }

   public void setErrorMsg(String var1) {
      this.m_errorMsg = var1;
   }
}
