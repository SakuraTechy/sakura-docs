const fs = require('fs');
const path = require('path');

// 定位要修复的文件
const baseDir = path.resolve('./node_modules/.pnpm/@arco-design+web-vue@2.57.0_vue@3.5.13/node_modules/@arco-design/web-vue/es');

// 递归查找所有需要修复的js文件
function findJsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findJsFiles(filePath, fileList);
    } else if (file.endsWith('.js')) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('import "') || content.includes("import '")) {
        fileList.push(filePath);
      }
    }
  });
  
  return fileList;
}

// 修复文件
function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 修复样式导入
  content = content.replace(/import ['"](.+\.css)['"];?/g, 
    'try { require("$1"); } catch(e) { console.warn("CSS import skipped:", e.message); }');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`已修复文件: ${filePath}`);
}

// 执行修复
console.log('开始修复 @arco-design/web-vue 模块...');
try {
  const files = findJsFiles(baseDir);
  console.log(`找到 ${files.length} 个需要修复的文件`);
  
  files.forEach(filePath => {
    fixFile(filePath);
  });
  
  console.log('修复完成!');
} catch (error) {
  console.error('修复过程中出错:', error);
} 