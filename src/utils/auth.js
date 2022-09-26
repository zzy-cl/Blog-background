import { TOKEN_TIME, TOKEN_TIME_VALUE } from "./constant";

// 登录时设置时间,把此刻的时间存进本地存储
export const setTokenTime = () => {
  localStorage.setItem(TOKEN_TIME, Date.now());
};

// 获取，获取我们存取的时间
export const getTokenTime = () => {
  return localStorage.getItem(TOKEN_TIME);
};

// 是否已经过期
export const diffTokenTime = () => {
  // 得到此时最新的时间
  const currentTime = Date.now();
  // 得到本地存储中的时间
  const tokenTime = getTokenTime();
  // 返回是否超时的 Boolean 值
  return currentTime - tokenTime > TOKEN_TIME_VALUE;
};

// 在请求拦截器中使用
