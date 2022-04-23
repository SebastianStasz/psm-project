const getExpenses = async () => {
    const user = firebase.auth().currentUser.email;
    let content = '<p class="lead mt-4" id="monthlyTotal">Suma wydatków w tym miesiącu:</p><p class="h2">'

    let date = new Date(), y = date.getFullYear(), m = date.getMonth();
    let firstDayOfMonth = new Date(y, m, 1);
    let lastDayOfMonth = new Date(y, m + 1, 0);

    await db.collection("expenses")
        .where("user", "==", user)
        .where('date', '>=', firstDayOfMonth)
        .where('date', '<=', lastDayOfMonth)
        .get().then((querySnapshot) => {
            var total = 0;
            querySnapshot.forEach((doc) => {
                print(doc.data()["price"])
                total += doc.data()["price"]
            });
            content += total.toString();
    });
    content +=' zł</p>'
    $("#monthlyTotal").replaceWith(content)
}

const refreshBtn = document.getElementById("refresh-btn");
casflowsBtn.addEventListener("click", getExpenses, false)


$(document).ready(function(){
    getExpenses();
});
