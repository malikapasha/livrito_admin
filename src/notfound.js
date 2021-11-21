fetch('https://livrito.herokuapp.com/users',
  {
method: 'POST',
 headers: {
 Accept: 'application/json',
'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name:this.state.name.replace(/^\s+|\s+$/g, ""),
 email:this.state.email.replace(/^\s+|\s+$/g, ""),
                    password:this.state.password.replace(/^\s+|\s+$/g, ""),
                    contact:this.state.contact.replace(/^\s+|\s+$/g, "")
                }),
              })
              .then((response) => response.json())
              .then((responseJson) => {  
               
                console.log(responseJson.status)
                  if(responseJson.status)
              {
                  this.props.navigation.navigate('continue')
                    AsyncStorage.setItem('islogin', 'true');

                      AsyncStorage.setItem('usname', this.state.name);
                        AsyncStorage.setItem('usemail', this.state.email);
                          AsyncStorage.setItem('uspassword', this.state.password);
              }
              else{
                Alert.alert( 
                       this.state.lang==='En'?'Email already exist': this.state.lang==='Fr'?   'E-mail existe déjà' :  'البريد الالكتروني موجود مسبقا'
                
                
                       )
