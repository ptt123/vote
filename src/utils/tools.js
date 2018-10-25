const tools = {
  isToday (str) {
    if (new Date(str).toDateString() === new Date().toDateString()) {
      return 1;
      //今天
    } else if (new Date(str) < new Date()){
      return 0;
      //之前
    }
  }
}
module.exports = tools