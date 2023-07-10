var db;

            function createDatabase() {
                db = openDatabase("ecomdb", "1.0", "THis is just a simple database", 2 * 1024 * 1024)
                // alert("Database is created successfully...")
            }

            createDatabase();

            function loginUser() {
                var uname = document.getElementById('userId').value
                var password = document.getElementById('userPass').value

                console.log("unm: " + uname);
                console.log("unm: " + password);

                db.transaction(function (tx) {
                    tx.executeSql("select * from users", [], function (tx, result) {
                        var len = result.rows.length
                        var isValidUser = false;
                        console.log("query fired.. len: " + len);
                        if (len == 0) {
                            alert("No users found")
                        } else {
                            for (i = 0; i < len; i ++) {
                                console.log("unm db : " + result.rows.item(i).uname);
                                console.log("pwd db : " + result.rows.item(i).password);

                                if (result.rows.item(i).uname === uname && result.rows.item(i).password === password) {
                                    alert("Login successful.");
                                    location.replace("http://127.0.0.1:5500/E-commerce/Welcome.html");
                                    isValidUser = true;
                                    return;
                                }
                            }
                        }
                        if (! isValidUser) {
                            alert("Invalid Credentials..");
                        }
                    })
                })
            }


            function verifyPassword() {
                var password = document.getElementById("userPass").value;
                var cPassword = document.getElementById("rePass").value;
            
                if (password == cPassword) {
                  document.getElementById("rePass").style.borderStyle = "solid";
                  document.getElementById("rePass").style.borderColor = "green";
                  document.getElementById("passwordMessage").innerHTML =
                    "Password matched";
                  document.getElementById("button").disabled = false;
                } else {
                  document.getElementById("rePass").style.borderStyle = "solid";
                  document.getElementById("rePass").style.borderColor = "red";
                  document.getElementById("passwordMessage").innerHTML =
                    "Password does not match";
                  document.getElementById("button").disabled = true;
                }
              }

    function resetpass() {
        var uname = document.getElementById('reuserId').value
        var useremail = document.getElementById('reemail').value 
        var unpass = document.getElementById('rePass').value

        console.log(uname + "- "+ userPass +"-" +unpass)
      
                

                db.transaction(function (tx) {
                    tx.executeSql("select * from users", [], function (tx, result) {
                        var len = result.rows.length
                        var isValidUser = false;
                        console.log("query fired.. len: " + len);
                        if (len == 0) {
                            alert("No users found")
                        } else {
                            for (i = 0; i < len; i ++) {
                                console.log("unm db : " + result.rows.item(i).uname);
                                console.log("pwd db : " + result.rows.item(i).password);
                                console.log("pwd Email : " + result.rows.item(i).email);
                                
                               

                                if (result.rows.item(i).uname === uname && result.rows.item(i).email === useremail) {
                                    //alert("unm pwd match successful.");
                                    
                                    console.log("UPDATE users SET password = '"+unpass +"'"+ " WHERE uname = '"+uname+"'");
                                    tx.executeSql("UPDATE users SET password = '"+unpass +"'"+ " WHERE uname = '"+uname+"'");
                                    // Handle the success or error callback if needed
                                    isValidUser = true;
                                    alert("Password Upadted Successfully");
                                    location.replace("http://127.0.0.1:5500/E-commerce/Login.html");
                                    return;
                                }
                            }
                          
                        }
                        if (! isValidUser) {
                            alert("Invalid user Name or Email");
                        }
                        
                    })
                })
            }