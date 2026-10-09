let apikey = 
"44eb66a7-10d5-443f-a680-5bd6dff8c15b";
select();

function select () {
    let url = "https://db.monaca.education/select?apikey=" + apikey;
    console.log(url);
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(db) {
            console.log(db);
            let moneyRecord = document.getElementById("moneyRecord");
            for (let i = 0; i < db.records.length; i++) {
                // DOM準備
                let tr = document.createElement("tr");
                let id = document.createElement("th");
                let title = document.createElement("td");
                let price = document.createElement("td");
                let flow = document.createElement("td");
                // DOMに値を格納
                id.innerHTML = db.records[i].id;
                title.innerHTML = db.records[i].text0;
                price.innerHTML = db.records[i].int0;
                if(db.records[i].int1 == 1) {
                    flow.innerHTML = "収入";
                } else if (db.records[i].int1 == -1) {
                    flow.innerHTML = "支出";
                } else {
                    flow.innerHTML = "？？？";
                }
                // 構築したDOM要素を表に追加
                tr.appendChild(id);
                tr.appendChild(title);
                tr.appendChild(price);
                tr.appendChild(flow);
                moneyRecord.appendChild(tr);
            }
            // 集計
            let incomeTotal = 0;
            let outgoTotal  = 0;
            for (let i = 0; i < db.records.length; i++) {
                if(db.records[i].int1 == 1) {
                    incomeTotal += db.records[i].int0;
                } else if (db.records[i].int1 == -1) {
                    outgoTotal += db.records[i].int0;
                } else {
                    // 不明な記録は無視
                }
            }
            document.getElementById("incomeTotal").innerHTML = incomeTotal;
            document.getElementById("outgoTotal").innerHTML  = outgoTotal;
            document.getElementById("money").innerHTML       = incomeTotal - outgoTotal;
    });
}

function insert (){
    // フォームの値を取得
    let form = document.getElementById("insertForm");
    let title = form.title.value;
    let price = form.price.value;
    let flow = form.flow.value;

    // DBに登録
    let url = "https://db.monaca.education/insert?apikey=" + apikey;
    url += "&text0=" + title + "&int0=" + price + "&int1=" + flow;
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(result) {
            console.log(result);
            location.reload();
    });
}

function update() {
    // フォームの値を取得
    let form = document.getElementById("updateForm");
    let id = form.id.value;
    let title = form.title.value;
    let price = form.price.value;
    let flow = form.flow.value;

    // DB問い合わせ
    let url = "https://db.monaca.education/update?apikey=" + apikey;
    url += "&idIn=" + id;
    url += "&text0=" + title + "&int0=" + price + "&int1=" + flow;
    console.log(url);
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(result) {
            location.reload();
    });
}

function deleteDB() {
    // フォームの値を取得
    let form = document.getElementById("deleteForm");
    let id = form.id.value;

    // DB問い合わせ
    let url = "https://db.monaca.education/delete?apikey=" + apikey;
    url += "&idIn=" + id;
    console.log(url);
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(result) {
            console.log(result);
            location.reload();
    });
}