
            var db;

            function createDatabase() {
                db = openDatabase("ecomdb", "1.0", "THis is just a simple database", 2 * 1024 * 1024)
                // alert("Database is created successfully...")
            }

            createDatabase();

            function createTable() {
                db.transaction(function (tx) {
                    tx.executeSql("CREATE TABLE IF NOT EXISTS users(id unique,name,uname,email,contactNumber,password)")
                    alert("Table is created successfully")
                })

            }

            function matchPasswords() {
                var password = document.getElementById("pwd").value
                var cPassword = document.getElementById("repeatPwd").value

                if (password == cPassword) {
                    document.getElementById("repeatPwd").style.borderColor = "green";
                    document.getElementById("sample").innerHTML = "Password matched";
                } else {
                    document.getElementById("sample").innerHTML = "Password does not match";
                    // document.getElementById("sbtbtn").disabled = true
                }
            }

            function registerUser() {
              alert("Register");
                var name = document.getElementById('name').value
                var uname = document.getElementById('userName').value
                var email = document.getElementById('email').value
                var contactNumber = document.getElementById('mobileNo').value
                var password = document.getElementById('pwd').value
                var rePwd = document.getElementById('repeatPwd').value

                var id = 0;

                if (name == "" || uname == "" || email == "" || contactNumber == "" || password == "" || rePwd == "") {
                    alert("all fields are required  ");
                    return;
                }


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
                        alert("Data is inserted successfully")
                    })
                })
            }

            function loginUser() {
                var uname = document.getElementById('unm').value
                var password = document.getElementById('pwd').value

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
                                    alert("unm pwd mathces");
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
      
