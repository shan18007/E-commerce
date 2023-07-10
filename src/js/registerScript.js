
            var db;

            function createDatabase() {
                db = openDatabase("ecomdb", "1.0", "THis is just a simple database", 2 * 1024 * 1024)
                // alert("Database is created successfully...")
            }

            function createTable() {
                db.transaction(function (tx) {
                    tx.executeSql("CREATE TABLE IF NOT EXISTS users(id unique,name,uname,email,contactNumber,password)")
                    // alert("Table is created successfully")
                })

            }

            function registerUser() {

              createDatabase();
              createTable();

                var name = document.getElementById('name').value
                var uname = document.getElementById('userName').value
                var email = document.getElementById('email').value
                var contactNumber = document.getElementById('mobileNo').value
                var password = document.getElementById('pwd').value
                var rePwd = document.getElementById('repeatPwd').value

                var id = 0;

                db.transaction(function (tx) {
                    tx.executeSql("select * from users", [], function (tx, result) {
                        var len = result.rows.length;
                        console.log("lenghth: " + len);

                        console.log("INSERT INTO users(id,name,uname,email,contactNumber,password) VALUES (" + (
                            len + 1
                        ) + ",'" + name + "','" + uname + "','" + email + "' , " + contactNumber + ", '" + password + "')");
                        tx.executeSql("INSERT INTO users(id,name,uname,email,contactNumber,password) VALUES (" + (
                            len + 1
                        ) + ",'" + name + "','" + uname + "','" + email + "' , " + contactNumber + ", '" + password + "')");
                        alert("Data is inserted successfully");
                        location.replace("http://127.0.0.1:5500/E-commerce/Login.html");
                    })
                })
            }

            function verifyPassword() {
                var password = document.getElementById("pwd").value;
                var cPassword = document.getElementById("repeatPwd").value;
        
                if (password == cPassword) {
                  document.getElementById("repeatPwd").style.borderStyle = "solid";
                  document.getElementById("repeatPwd").style.borderColor = "green";
                  document.getElementById("passwordMessage").innerHTML =
                    "Password matched";
                  document.getElementById("sbtbtn").disabled = false;
                } else {
                  document.getElementById("repeatPwd").style.borderStyle = "solid";
                  document.getElementById("repeatPwd").style.borderColor = "red";
                  document.getElementById("passwordMessage").innerHTML =
                    "Password does not match";
                  document.getElementById("sbtbtn").disabled = true;
                }
              }

            
            
      
