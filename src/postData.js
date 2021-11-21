export function postData(type , userData)
{

    let baseUrl = 'https://livrito.herokuapp.com/users/';
    return new Promise((resolve , reject) =>
    {
   fetch(baseUrl+ type ,
   {
       method: 'POST',
        headers:{
            'Accept':'json/application' ,
            'Content-Type':'json/application' ,
        },
        body:JSON.stringify(userData)
   }).then((response) => response.json())
   .then((responseJson) =>
   {
       resolve(responseJson);
   })
   .catch((error) =>
   {
     reject(error);
   })
    });
}