// session操作
const sessionData = function(method, name, obj) {
  /*
   * 参数说明：
   * method：get获取，set存入或覆盖，clean清除
   * name:session的名称
   * obj:存入的内容，可以是任意类型
   * */
  switch (method) {
    case "get":
      if (sessionStorage.getItem(name + "_obj")) {
        return JSON.parse(sessionStorage.getItem(name + "_obj"));
      } else if (sessionStorage.getItem(name + "_str")) {
        return sessionStorage.getItem(name + "_str");
      } else {
        return null;
      }
    case "set":
      sessionData("clean", name);
      if (typeof obj == "object") {
        sessionStorage.setItem(name + "_obj", JSON.stringify(obj));
      } else {
        sessionStorage.setItem(name + "_str", obj);
      }
      return true;
    case "clean":
      sessionStorage.removeItem(name + "_obj");
      sessionStorage.removeItem(name + "_str");
      return true;
  }
};

export { sessionData };
