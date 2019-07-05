let fs=require("fs"),gulp=require("gulp"),spritesmith=require('gulp.spritesmith'), newdir=(new Date()).valueOf();

gulp.task('px', ()=> {
    return gulp.src('images/*')//需要合并的图片地址
        .pipe(spritesmith({
            imgName: 'sprite.png',//保存合并后图片的地址
            cssName: 'sprite.css',//保存合并后对于css样式的地址
            padding:20,//合并时两个图片的间距
            algorithm: 'binary-tree',//注释1
            cssTemplate:data=> {
                var arr=[];
                data.sprites.forEach(sprite=> {
                    arr.push(".icon-"+sprite.name+
                    "{" +
                    "background-image: url(./"+sprite.escaped_image+");"+
                    'background-size:' + data.spritesheet.px.width + ' ' + data.spritesheet.px.height +';'+
                    "background-position: "+sprite.px.offset_x+" "+sprite.px.offset_y+";"+
                    "width:"+sprite.px.width+";"+
                    "height:"+sprite.px.height+";"+
                    "}\n");
                });
                return arr.join("");
            }

        }))
        .pipe(gulp.dest('dist/PX-'+newdir+'/'));
});

gulp.task('rem', ()=> {
    return gulp.src('images/*')
        .pipe(spritesmith({
            imgName: 'sprite.png',//保存合并后图片的地址
            cssName: 'sprite.css',//保存合并后对于css样式的地址
            padding:20,//图片的间距
            algorithm: 'binary-tree',//注释1
            cssTemplate: data=> {
                var arr=[];
                data.sprites.forEach(sprite=> {
                    arr.push(".icon-"+sprite.name+
                    "{" +
                    "background-image: url(./"+sprite.escaped_image+");"+
                    'background-size:' + sprite.total_width/100 + 'rem ' + sprite.total_height/100 +'rem;'+
                    "background-position: "+sprite.offset_x/100+'rem '+sprite.offset_y/100+'rem;'+
                    "width:"+sprite.width/100+"rem;"+
                    "height:"+sprite.height/100+"rem;"+
                    "}\n");
                });
                return arr.join("");
            }
        }))
        .pipe(gulp.dest('dist/REM-'+newdir+'/'));
});

gulp.task('clean', done=> {
    delfile('images')
    done();
})

function delfile(path){
 let files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                delfile(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        // fs.rmdirSync(path);
    }
    return;
}