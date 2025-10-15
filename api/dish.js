export   出口 default   默认的 async   异步 function   函数   饲养员 handler   饲养员(req   要求的, res) {
  if (req.method !== 'POST') {   如果(点播。方法!== ' post '   ‘ post ’) {
    return res.status(405).json({ error: 'Method not allowed' });返回res.status   状态(405)。json({错误：‘方法不允许’})；
  }

  try {   尝试{
    const { image, top_num = 3 } = req.body;Const    常量{image   图像, top_num = 3} = req   要求的.body；   身体;
    
    // 从环境变量获取token
    const access_token = process.env.BAIDU_ACCESS_TOKEN;access_token = process   过程.env.BAIDU_ACCESS_TOKEN；   BAIDU_ACCESS_TOKEN;
    
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
      }
    );

    const data = await response.json();Const    常量data   数据 = await   等待 response   响应.json()；
    res.status(200).json(data);res.status   状态 (200) . json(数据);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });res.status   状态(500)。json({error   错误: ‘内部服务器错误’})；
  }
      }
