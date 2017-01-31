/**
 https://www.codewars.com/kata/52cf02cd825aef67070008fa/train/javascript 
 
 General Patron is faced with a problem , his intelligence has 
 intercepted some secret messages from the enemy but they are all 
 encrypted. Those messages are crutial to getting the jump on the 
 enemy and winning the war. Luckily intelligence also captured an 
 encoding device as well. However even the smartest programmers 
 weren't able to crack it though. So the general is asking you, 
 his most odd but brilliant programmer.

You can call the encoder like this.

console.log (device.encode ('What the hell')) ;
Our cryptoanalysts kept poking at it and found some interesting patterns.

console.log (device.encode ('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')) ;
==> bdhpF,82QsLirJejtNmzZKgnB3SwTyXG ?.6YIcflxVC5WE94UA1OoD70MkvRuPqHabdhpF,82QsLir
console.log (device.encode ('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb')) ;  
==> dhpF,82QsLirJejtNmzZKgnB3SwTyXG ?.6YIcflxVC5WE94UA1OoD70MkvRuPqHabdhp
console.log (device.encode ('ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc')) ;
==> flxVC5WE94UA1OoD70MkvRuPqHabdhpF,82QsLirJejtNmzZKgnB3SwTyXG
console.log (device.encode ('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')) ;
==> 1OoD70MkvRuPqHabdhpF,82QsLirJejtNmzZKgnB3SwTyXG ?.6YIcf
console.log (device.encode ('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB')) ;
==> 3SwTyXG ?.6YIcflxVC5WE94UA1OoD70MkvRuPqHabdhpF,82QsLirJejtNmzZKgnB3SwTyXG ?.6Y
console.log (device.encode ('!@#$%^&*()_+-')) ;
==> !@#$%^&*()_+-
console.log (device.encode('abcdefghijklmnopqrstuvwxyz')) ;
==> bhx,zWyLZ3pOGIhzeXTYtjAaDW
console.log ('abcdefghijklmnopqrstuvwxyz'.split ('').map (function (a) {
  return device.encode (a) ;
}).join ('')) ;
==> bdfhjlnprtvxzBDFHJLNPRTVXZ
console.log ('abcdefghijklmnopqrstuvwxyz'.split ('').map (function (a) {
  return device.encode ('_'+a)[1] ;
}).join ('')) ;
==> dhlptxBFJNRVZ37,aeimquyCGK
console.log ('abcdefghijklmnopqrstuvwxyz'.split ('').map (function (a) {
  return device.encode ('__'+a)[2] ;
}).join ('')) ;
==> hpxFNV3,emuCKS08bjrzHPX5 g
console.log ('aaaaaaaaaaaaaaaaaaaaaaaaaa'.split ('').map (function (a) {
  return device.encode (a) ;
}).join ('')) ;
==> bbbbbbbbbbbbbbbbbbbbbbbbbb
console.log ('aaaaaaaaaaaaaaaaaaaaaaaaaa'.split ('').map (function (a) {
  return device.encode ("_"+a)[1] ;
}).join ('')) ;
==> ddddddddddddddddddddddddddddd
console.log ('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa'.split ('').map (function (a) {
  return device.encode ("__"+a)[2] ;
}).join ('')) ;
==> hhhhhhhhhhhhhhhhhhhhhhhhhhhhh
console.log ('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa'.split ('').map (function (a) {
  return device.encode ("___"+a)[3] ;
}).join ('')) ;
==> ppppppppppppppppppppppppppppp
console.log ('zzzzzzzz'.split ('').map (function (a) {
  return device.encode (a) ;
}).join ('')) ;
==> ZZZZZZZZ
console.log ('ZZZZZZZZ'.split ('').map (function (a) {
  return device.encode ("___"+a)[3] ;
}).join ('')) ;
==> BBBBBBBB



We think if you keep on this trail you should be able to crack the code! You are expected to fill in the

device.decode
function. Good luck ! General Patron is counting on you!
 */

device.decode = function (w) {
  let result = '';
  let characters = 
    ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
     'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
     '0','1','2','3','4','5','6','7','8','9','.',',','?',' ','$']
  w.split('').forEach((chr,i)=>{
    let idx = characters.indexOf(chr)
    let pos = Math.pow(2, i+1)*chr;
    while (pos > characters.length) {
      pos -= characters.length;
    }
    result.push(characters[pos])
  })
  return result ; 
}