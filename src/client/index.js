// import another component
import main from './main';
import Gun from "gun/gun";
import "gun/sea";
//import jquery from 'jquery';
import $ from 'jquery';

//window.$ = window.jQuery = jquery; // notice the definition of global variables here

main();
//console.log("parceljs and polka server");
//console.log(location);
var gun = Gun(location.origin+"/gun");

gun.on('hi', peer => {//peer connect
  console.log('connect peer to',peer);
  //console.log('peer connect!');
});
gun.on('bye', (peer)=>{// peer disconnect
  console.log('disconnected from', peer);
  //console.log('disconnected from peer!');
});

gun.get('mark').put({
  name: "Mark",
  email: "mark@gunDB.io",
});
//$('#message').text("data");

gun.get('mark').on(function(data, key){
    console.log("update:", data);
    //console.log("update:", data.name);
    $('#message').text(data.name);
});
