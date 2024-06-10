export default async (url, header) => {
  let response = await fetch(url, header);
  if (response.status !== 401) {
    let jsonResposne = await response
      .json()
      .then((res) => res)
      .catch((e) => console.log(e));
    return { status: response.status, body: jsonResposne };
  } else {
    let jsonResposne = await response
      .json()
      .then((res) => res)
      .catch((e) => console.log(e));
    if (jsonResposne) return { status: response.status, body: jsonResposne };
    else return { status: response.status };
  }
};
