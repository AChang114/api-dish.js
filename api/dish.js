export   出口 default   默认的 async   异步 function   函数   饲养员 handler   饲养员(req   要求的, res) {
  // 设置超时响应
  res.setTimeout(30000, () => {
    res.status(408).json({ error: 'Request timeout' });res.status   状态(408)。json({错误：‘请求超时’})；
  });

  if (req.method !== 'POST') {   如果(点播。方法!== ' post '   ‘ post ’) {
    return res.status(405).json({ error: 'Method not allowed' });返回res.status   状态(405)。json({错误：‘方法不允许’})；
  }

  try {   尝试{
    const { image, top_num = 3 } = req.body;Const    常量{image   图像, top_num = 3} = req   要求的.body；   身体;
    
    const access_token = process.env.BAIDU_ACCESS_TOKEN;access_token = process   过程.env.BAIDU_ACCESS_TOKEN；   BAIDU_ACCESS_TOKEN;
    
    // 添加超时控制
    const controller = new AbortController();const   常量 controller   控制器 = new   新 AbortController()；
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8秒超时
    
    const response = await fetch(Const    常量response = await   等待    fetch ()fetch（）
      `https://aip.baidubce.com/rest/2.0/image-classify/v2/dish?access_token=${access_token}`,“https://aip.baidubce.com/rest/2.0/image-classify/v2/dish?access_token= $ {access_token}”,//aip.baidubce.com/rest/2.0/image-classify/v2/dish?access_token= $ {access_token} "，
      {
        method: 'POST',   方法:“文章”,
        headers: {   标题:{
          'Content-Type': 'application/x-www-form-urlencoded',“内容类型”:“应用程序/ x-www-form   形式-urlencoded”,
        },
        body: new URLSearchParams({
          image: image,   图片:图片,
          top_num: top_num.toString(),
        }),
        signal: controller.signal   信号:controller.signal
      }
    );

    clearTimeout(timeoutId);
    
    if (!response.ok) {   如果(!响应。ok) {
      throw new Error(`HTTP error! status: ${response.status}`);抛出新的错误(' HTTP错误！状态:$ {response.status}”);
    }

    const data = await response.json();Const    常量data   数据 = await   等待 response   响应.json()；
    res.status(200).json(data);res.status   状态 (200) . json(数据);
  } catch (error) {
    if (error.name === 'AbortError') {如果（error.name === 'AbortError'） {
      res.status(408).json({ error: 'Request to Baidu API timed out' });res.status   状态(408)。json({错误：‘请求百度API超时’})；
    } else {
      res.status(500).json({ error: error.message });res.status   状态(500)。Json ({error：错误。消息});
    }
  }
  }
