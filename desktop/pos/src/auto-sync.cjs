'use strict';
class AutoSync {
 constructor({run,shouldRun,onStatus=()=>{},setTimer=setTimeout,clearTimer=clearTimeout}){Object.assign(this,{run,shouldRun,onStatus,setTimer,clearTimer});this.running=false;this.stopped=true;this.failures=0;this.timer=null;}
 start(){this.stopped=false;this.schedule(5000);}
 schedule(delay){if(this.stopped)return;if(this.timer)this.clearTimer(this.timer);this.timer=this.setTimer(()=>this.tick(),delay);this.timer?.unref?.();}
 kick(){if(!this.stopped&&!this.running)this.schedule(0);}
 stop(){this.stopped=true;if(this.timer)this.clearTimer(this.timer);this.timer=null;}
 async tick(){this.timer=null;if(this.stopped||this.running)return;if(!this.shouldRun()){this.schedule(30000);return;}this.running=true;this.onStatus({running:true,error:null});
  try{await this.run();this.failures=0;this.onStatus({running:false,error:null,lastSuccess:Date.now()});}
  catch(error){this.failures++;this.onStatus({running:false,error:error.message});}
  finally{this.running=false;this.schedule(this.failures?Math.min(300000,15000*2**(this.failures-1)):60000);}
 }
}
module.exports={AutoSync};
