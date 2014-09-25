 function   doHighlight(domNode,   syntax)   { 
  var   htmltxt   =   ""; 
  if   (syntax.toLowerCase()   ==   "java"   ||   syntax.toLowerCase()   ==   "javascript")   { 
  htmltxt   =   new   JavaHighLighter(domNode).highlight(); 
  }   else   if   (syntax.toLowerCase()   ==   "xml"   ){ 
  htmltxt   =   new   XMLHighLighter(domNode).highlight(); 
  }   else   { 
  alert("Not   supportted   syntax:   "   +   syntax); 
  return; 
  }   
  var   newNode   =   document.createElement("SPAN"); 
  newNode.innerHTML   =   htmltxt; 
  var   pNode   =   domNode.parentNode.replaceChild(newNode,domNode); 
  } 
  
  function   JavaHighLighter(domNode)   { 
  if   (domNode   ==   null)   { 
  alert("domNode   is   null!");   return; 
  } 
  this._domNode   =   domNode; 
  this._codetxt   =   this._domNode.innerHTML; 
  this._keywords="public,protected,private,static,void,final,class,extends,implements,super,this,boolean,while,if,return,new,true,false,try,catch,throws,throw,null,package,import,else,int,long,do"; 
  this._commonObjects   =   "String,Integer,Long,Boolean,List"; 
  this._wordDelimiters="   ,.?!;:/<>(){}[]/"'/n/t=+*%"; 
  
  this.highlight   =   function()   { 
  var   codeArr   =   new   Array(); 
  var   word_index   =   0; 
  var   htmlTxt   =   ""; 
  
  for   (var   i   =   0;   i   <   this._codetxt.length;   i++)   { 
  if   (this._wordDelimiters.indexOf(this._codetxt.charAt(i))   ==   -1)   {   //找不到 
  if   (codeArr[word_index]   ==   null   ||   typeof(codeArr[word_index])   ==   'undefined')   { 
  codeArr[word_index]   =   ""; 
  }   
  
  codeArr[word_index]   +=   this._codetxt.charAt(i); 
  }   else   { 
  if   (typeof(codeArr[word_index])   !=   'undefined'   &&   codeArr[word_index].length   >   0) 
  word_index++; 
  codeArr[word_index++]   =   this._codetxt.charAt(i); 
  }   
  
  } 
  
  
  var   quote_opened   =   false; 
  var   slash_star_comment_opened   =   false; 
  var   slash_slash_comment_opened   =   false; 
  var   line_num=1; 
  
  htmlTxt   +=   ("<div   class='code'>"); 
  for   (var   i=0;   i   <   word_index;   i++)   { 
  if   (codeArr[i]   ==   "   ")   { 
  htmlTxt   +=   ("&nbsp;"); 
  }   else   if   (!slash_star_comment_opened   &&   !quote_opened   &&   this.isKeyword(codeArr[i]))   {   //keyword 
  htmlTxt   +=   ("<span   class='keyword'>"   +   codeArr[i]   +   "</span>"); 
  }   else   if   (!slash_star_comment_opened   &&   !quote_opened   &&   this.isCommonObject(codeArr[i]))   {   //keyword 
  htmlTxt   +=   ("<span   class='commonobject'>"   +   codeArr[i]   +   "</span>"); 
  }   else   if   (codeArr[i]   ==   "/n")   { 
  if   (slash_slash_comment_opened)   { 
  htmlTxt   +=   ("</span>"); 
  slash_slash_comment_opened   =   false; 
  } 
  htmlTxt   +=   ("<br/>"); 
  line_num++; 
  
  }   else   if   (codeArr[i]   ==   "/""   &&   codeArr[i-1]   !="//")   { 
  if   (slash_star_comment_opened)   { 
  htmlTxt   +=   (codeArr[i]);   continue; 
  } 
  if   (quote_opened){ 
  htmlTxt   +=   (codeArr[i]+"</span>"); 
  quote_opened   =   false; 
  } 
  else   { 
  htmlTxt   +=     ("<span   class='string'>"+codeArr[i]); 
  quote_opened   =   true; 
  } 
  }   else   if   (codeArr[i]   ==   "/")   { 
  if   (codeArr[i+1]   ==   "*")   { 
  if   (slash_slash_comment_opened   ||   slash_star_comment_opened)   { 
  htmlTxt   +=   (codeArr[i]);   continue; 
  } 
  slash_star_comment_opened   =   true; 
  htmlTxt   +=     ("<span   class='comment'>"   +   codeArr[i]   +   codeArr[i+1]); 
  i++; 
  }   else   if   (codeArr[i+1]   ==   "/"){ 
  if   (slash_star_comment_opened   ||   slash_slash_comment_opened)   { 
  htmlTxt   +=   (codeArr[i]);   continue; 
  } 
  slash_slash_comment_opened   =   true; 
  htmlTxt   +=     ("<span   class='comment'>"   +   codeArr[i]   +   codeArr[i+1]); 
  i++; 
  }   else   { 
  htmlTxt   +=   (codeArr[i]); 
  } 
  
  }   else   if   (codeArr[i]   ==   "*")   { 
  if   (codeArr[i+1]   ==   "/")   { 
  if   (slash_slash_comment_opened)   { 
  htmlTxt   +=   (codeArr[i]);   continue; 
  } 
  if   (slash_star_comment_opened)   { 
  slash_star_comment_opened   =   false; 
  htmlTxt   +=     (codeArr[i]   +   codeArr[i+1]   +"</span>"); 
  i++; 
  } 
  }   else   { 
  htmlTxt   +=   (codeArr[i]); 
  } 
  
  }   else   if   (codeArr[i]   ==   "/t")   {   //keyword 
  htmlTxt   +=   ("&nbsp;&nbsp;&nbsp;&nbsp;"); 
  }   else   if   (codeArr[i]   ==   "<")   {   //keyword 
  htmlTxt   +=   ("&lt;"); 
  }   else   { 
  htmlTxt   +=   (codeArr[i]); 
  } 
  
  } 
  htmlTxt   +=   ("</div>"); 
  
  return   htmlTxt; 
  } 
  
  this.isKeyword   =   function(val)   { 
  var   keywordArr   =   this._keywords.split(","); 
  for   (var   i   =   0;   i   <   keywordArr.length;   i++){ 
  if   (keywordArr[i]   ==   val)   { 
  return   true; 
  } 
  } 
  return   false; 
  } 
  
  this.isCommonObject   =   function(val)   { 
  var   keywordArr   =   this._commonObjects.split(","); 
  for   (var   i   =   0;   i   <   keywordArr.length;   i++)   { 
  if   (keywordArr[i]   ==   val)   return   true; 
  } 
  return   false; 
  } 
  } 
  
  function   XMLHighLighter(domNode)   { 
  JavaHighLighter.call(this,domNode); 
  this._keywords="xml"; 
  this._commonObjects="version,encoding" 
  this._wordDelimiters="<?-   //">/n/t"; 
  
  this.highlight   =   function()   { 
  var   codeArr   =   new   Array(); 
  var   word_index   =   0; 
  var   htmlTxt   =   ""; 
  for   (var   i   =   0;   i   <   this._codetxt.length;   i++)   { 
  if   (this._wordDelimiters.indexOf(this._codetxt.charAt(i))   ==   -1)   {   //找不到 
  if   (codeArr[word_index]   ==   null   ||   typeof(codeArr[word_index])   ==   'undefined')   { 
  codeArr[word_index]   =   ""; 
  }   
  
  codeArr[word_index]   +=   this._codetxt.charAt(i); 
  }   else   { 
  if   (typeof(codeArr[word_index])   !=   'undefined'   &&   codeArr[word_index].length   >   0) 
  word_index++; 
  codeArr[word_index++]   =   this._codetxt.charAt(i); 
  }   
  
  } 
  
  
  
  var   quote_opened   =   false; 
  var   comment_opened   =   false; 
  var   line_num=1; 
  var   node_opened   =   false; 
  
  htmlTxt   +=   ("<div   class='code'>"); 
  for   (var   i=0;   i   <   word_index;   i++)   { 
  if   (codeArr[i]   ==   "   ")   { 
  htmlTxt   +=   ("&nbsp;"); 
  }   else   if   (!comment_opened   &&   !quote_opened   &&   this.isKeyword(codeArr[i]))   {   //keyword 
  htmlTxt   +=   ("<span   class='keyword'>"   +   codeArr[i]   +   "</span>"); 
  }   else   if   (!comment_opened   &&   !quote_opened   &&   this.isCommonObject(codeArr[i]))   {   //keyword 
  htmlTxt   +=   ("<span   class='commonobject'>"   +   codeArr[i]   +   "</span>"); 
  }   else   if   (codeArr[i]   ==   "/n")   { 
  htmlTxt   +=   ("<br/>"); 
  line_num++; 
  
  }   else   if   (codeArr[i]   ==   "/"")   { 
  if   (comment_opened)   { 
  htmlTxt   +=   (codeArr[i]);   continue; 
  } 
  if   (quote_opened){ 
  htmlTxt   +=   (codeArr[i]+"</span>"); 
  quote_opened   =   false; 
  }   else   { 
  htmlTxt   +=     ("<span   class='string'>"+codeArr[i]); 
  quote_opened   =   true; 
  } 
  }   else   if   (codeArr[i]   ==   "<")   { 
  if   (codeArr[i+1]   ==   "!")   { 
  if   (comment_opened)   { 
  htmlTxt   +=   (codeArr[i]);   
  continue; 
  } 
  comment_opened   =   true; 
  htmlTxt   +=     ("<span   class='comment'>&lt;"   +   codeArr[i+1]); 
  i++; 
  continue; 
  }   
  node_opened   =   true; 
  htmlTxt   +=   ("&lt;<span   class='node'>"); 
  
  }   else   if   (codeArr[i]   ==   "-")   { 
  if   (codeArr[i-1]=="-"   &&   codeArr[i+1]   ==   ">")   { 
  if   (comment_opened)   { 
  comment_opened   =   false; 
  htmlTxt   +=     (codeArr[i]   +   "&gt;</span>"); 
  i++; 
  } 
  }   else   { 
  htmlTxt   +=   (codeArr[i]); 
  } 
  
  }   else   if   (codeArr[i]   ==   "/t")   {   //keyword 
  htmlTxt   +=   ("&nbsp;&nbsp;&nbsp;&nbsp;"); 
  }   else   if   (codeArr[i]   ==   ">")   {   //keyword 
  if   (node_opened)   { 
  htmlTxt   +=   ("</span>&gt;"); 
  }   else 
  htmlTxt   +=   "&gt;"; 
  }   else   { 
  htmlTxt   +=   (codeArr[i]); 
  }   
  
  } 
  htmlTxt   +=   ("</div>"); 
  
  return   htmlTxt; 
  } 
  }
