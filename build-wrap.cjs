const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 设置NODE_OPTIONS环境变量以允许ES模块
process.env.NODE_OPTIONS = '--experimental-json-modules';

try {
  console.log('先修复 @arco-design/web-vue 模块...');
  // 运行修复脚本
  require('./arco-patch.cjs');
  
  console.log('开始构建...');
  execSync('vitepress build', { stdio: 'inherit' });
  console.log('构建完成！');
} catch (error) {
  console.error('构建过程中出错:', error.message);
  process.exit(1);
} 