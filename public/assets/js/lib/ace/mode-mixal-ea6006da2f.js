define("ace/mode/mixal_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],(function(e,t,i){"use strict";var l=e("../lib/oop"),N=e("./text_highlight_rules").TextHighlightRules,o=function(){var e=function(e){return e&&e.search(/^[A-Z\u0394\u03a0\u03a30-9]{1,10}$/)>-1&&e.search(/[A-Z\u0394\u03a0\u03a3]/)>-1},t=function(e){return e&&["NOP","ADD","FADD","SUB","FSUB","MUL","FMUL","DIV","FDIV","NUM","CHAR","HLT","SLA","SRA","SLAX","SRAX","SLC","SRC","MOVE","LDA","LD1","LD2","LD3","LD4","LD5","LD6","LDX","LDAN","LD1N","LD2N","LD3N","LD4N","LD5N","LD6N","LDXN","STA","ST1","ST2","ST3","ST4","ST5","ST6","STX","STJ","STZ","JBUS","IOC","IN","OUT","JRED","JMP","JSJ","JOV","JNOV","JL","JE","JG","JGE","JNE","JLE","JAN","JAZ","JAP","JANN","JANZ","JANP","J1N","J1Z","J1P","J1NN","J1NZ","J1NP","J2N","J2Z","J2P","J2NN","J2NZ","J2NP","J3N","J3Z","J3P","J3NN","J3NZ","J3NP","J4N","J4Z","J4P","J4NN","J4NZ","J4NP","J5N","J5Z","J5P","J5NN","J5NZ","J5NP","J6N","J6Z","J6P","J6NN","J6NZ","J6NP","JXAN","JXZ","JXP","JXNN","JXNZ","JXNP","INCA","DECA","ENTA","ENNA","INC1","DEC1","ENT1","ENN1","INC2","DEC2","ENT2","ENN2","INC3","DEC3","ENT3","ENN3","INC4","DEC4","ENT4","ENN4","INC5","DEC5","ENT5","ENN5","INC6","DEC6","ENT6","ENN6","INCX","DECX","ENTX","ENNX","CMPA","FCMP","CMP1","CMP2","CMP3","CMP4","CMP5","CMP6","CMPX","EQU","ORIG","CON","ALF","END"].indexOf(e)>-1},i=function(e){return e&&-1==e.search(/[^ A-Z\u0394\u03a0\u03a30-9.,()+*/=$<>@;:'-]/)};this.$rules={start:[{token:"comment.line.character",regex:/^ *\*.*$/},{token:function(t,l,N,o,r,n){return[e(t)?"variable.other":"invalid.illegal","text","keyword.control","text",i(r)?"text":"invalid.illegal","comment.line.character"]},regex:/^(\S+)?( +)(ALF)(  )(.{5})(\s+.*)?$/},{token:function(t,l,N,o,r,n){return[e(t)?"variable.other":"invalid.illegal","text","keyword.control","text",i(r)?"text":"invalid.illegal","comment.line.character"]},regex:/^(\S+)?( +)(ALF)( )(\S.{4})(\s+.*)?$/},{token:function(i,l,N,o){return[e(i)?"variable.other":"invalid.illegal","text",t(N)?"keyword.control":"invalid.illegal","comment.line.character"]},regex:/^(\S+)?( +)(\S+)(?:\s*)$/},{token:function(l,N,o,r,n,a){return[e(l)?"variable.other":"invalid.illegal","text",t(o)?"keyword.control":"invalid.illegal","text",i(n)?"text":"invalid.illegal","comment.line.character"]},regex:/^(\S+)?( +)(\S+)( +)(\S+)(\s+.*)?$/},{defaultToken:"text"}]}};l.inherits(o,N),t.MixalHighlightRules=o})),define("ace/mode/mixal",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/mixal_highlight_rules"],(function(e,t,i){"use strict";var l=e("../lib/oop"),N=e("./text").Mode,o=e("./mixal_highlight_rules").MixalHighlightRules,r=function(){this.HighlightRules=o};l.inherits(r,N),function(){this.$id="ace/mode/mixal",this.lineCommentStart="*"}.call(r.prototype),t.Mode=r})),window.require(["ace/mode/mixal"],(function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)}));