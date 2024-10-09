/**
 * 切换 Tab 信息, 注册事件，当有切换时，通知渲染进程
 * 单例模式
 */
export const events = []
export class TabChangeInfo {
  public events: Array<any>
  static instance: any;
  id: any;
  constructor(id) {
    if (!TabChangeInfo.instance) {
      this.events = []
      this.id = id
      //将this挂载到SingletonApple这个类的instance属性上
      TabChangeInfo.instance = this;
    }else{
      return TabChangeInfo.instance
    }
  }
  // 注册事件
  emit(cb:any,ctx){
    this.events.push(cb)
  }
  // 触发事件
  trigger(){
    this.events.forEach((cb)=>{
      cb()
    })
  }
}