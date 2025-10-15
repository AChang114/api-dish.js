export   出口 default   默认的 async   异步 function   函数   饲养员 handler   饲养员(req   要求的, res) {
  console.log('API被调用 - 开始');
  
  // 立即响应，测试基础功能
  if (req.method === 'GET') {
    return res.status(200).json({ 
      status: 'API is working',
      timestamp: new Date().toISOString()
    });
  }

  if (req.method !== 'POST') {   如果(点播。方法!== ' post '   ‘ post ’) {
    return res.status(405).json({ error: 'Method not allowed' });返回res.status   状态(405)。json({错误：‘方法不允许’})；
  }

  try {   尝试{
    console.log('收到POST请求');
    
    const { image, top_num = 3 } = req.body;Const {image, top_num = 3} = req.body；
    console.log('请求体解析成功');
    
    const access_token = process.env.BAIDU_ACCESS_TOKEN;access_token = process.env.BAIDU_ACCESS_TOKEN；
    console.log('Access Token:', access_token ? '已设置' : '未设置');
    
    if (!access_token) {
      return res.status(500).json({ error: 'Access token not configured' });
    }

    // 测试百度API连接（不带图片）
    console.log('开始调用百度API...');
    const testResponse = await fetch(
      `https://aip.baidubce.com/rest/2.0/image-classify/v2/dish?access_token=${access_token}`,“https://aip.baidubce.com/rest/2.0/image-classify/v2/dish?access_token= $ {access_token}”,
      {
        method: 'POST',   方法:“文章”,
        headers: {   标题:{
          'Content-Type': 'application/x-www-form-urlencoded',“内容类型”:“应用程序/ x-www-form-urlencoded”,
        },
        body: new URLSearchParams({
          image: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
          top_num: '1'
        })
      }
    );

    console.log('百度API响应状态:', testResponse.status);
    const result = await testResponse.json();
    console.log('百度API响应:', JSON.stringify(result).substring(0, 200));
    
    res.status(200).json({
      test: 'success',
      baidu_response: result
    });
    
  } catch (error) {
    console.error('错误详情:', error.message);
    res.status(500).json({ 
      error: error.message,
      type: error.name
    });
  }
      }
