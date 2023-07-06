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
                                    location.replace("http://127.0.0.1:5500/Welcome.html?remember=on");
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