
$(function(){hentData()})
function kjopBillet() {
    $("#antallF").html("");
    $("#fornavnF").html("");
    $("#etternavnF").html("");
    $("#telefonnrF").html("");
    $("#epostF").html("");

    let test = true;

    let film = $("#film").val();
    if (film === "Velg film her") {
        $("#filmF").html("Velg film");
        test = false;
    }

    let antall = $("#antall").val();
    if (antall === "" || parseInt(antall) <= 0) {
        $("#antallF").html("Det må skrives inn et antall større enn 0.");
        test = false;
    }

    let fornavn = $("#fornavn").val();
    if (fornavn === "") {
        $("#fornavnF").html("Det må skrives inn et fornavn");
        test = false;
    }

    let etternavn = $("#etternavn").val();
    if (etternavn === "") {
        $("#etternavnF").html("Det må skrives inn et etternavn");
        test = false;
    }

    let telefonnr = $("#telefonnr").val();
    if (telefonnr === "") {
        $("#telefonnrF").html("Det må skrives inn et telefonnr");
        test = false;
    }

    let epost = $("#epost").val();
    if (epost === "") {
        $("#epostF").html("Det må skrives inn en epost");
        test = false;
    }

    if (test) {
        if (!validerTelefonnr(telefonnr) || !validerMailadresse(epost) || isNaN(parseInt(antall)) || parseInt(antall) <= 0) {
            return;
        }
        const billett = {
            film: $("#film").val(),
            antall: $("#antall").val(),
            fornavn: $("#fornavn").val(),
            etternavn: $("#etternavn").val(),
            telefonnr: $("#telefonnr").val(),
            epost: $("#epost").val()
        };
        $.post("/lagre", billett, function (){
            hentData();
        });
    }

    if (!film || !antall || !fornavn || !etternavn || !telefonnr || !epost) {
        alert("Fyll ut alle feltene riktig før du trykker 'Kjøp billett'");
        return;
    }
}

function hentData(){
    $.get("/hentData", function (data) {
        brukData(data);
    });
}

function brukData(billett) {
    let ut = "<table class='table table-striped'><tr>" +
        "<th>Film</th>" +
        "<th>Antall</th>" +
        "<th>Fornavn</th>" +
        "<th>Etternavn</th>" +
        "<th>Telefonnr</th>" +
        "<th>Epost</th></tr>";
    for (const i of billett) {
        ut += "<tr>" +
            "<td>" + i.film + "</td>" +
            "<td>" + i.antall + "</td>" +
            "<td>" + i.fornavn + "</td>" +
            "<td>" + i.etternavn + "</td>" +
            "<td>" + i.telefonnr + "</td>" +
            "<td>" + i.epost + "</td></tr>";
    }
    ut += "</table>";
    $("#billettTabell").html(ut);

    $("#film").val("Velg film her");
    $("#antall").val("");
    $("#fornavn").val("");
    $("#etternavn").val("");
    $("#telefonnr").val("");
    $("#epost").val("");
}

function slettBilletter() {
    $.get("/slettBilletter", function () {
        hentData();
    });
}

function validerTelefonnr(telefonnr) {
    if (!telefonnr.match(/^\d{8}$/)) {
        $("#telefonnrF").html("Det må skrives inn et telefonnr på 8 siffer.");
        return false;
    }
    return true;
}
function validerMailadresse(epost) {
    if (!epost.match(/^\S+@\S+\.\S+$/)) {
        $("#epostF").html("Det må skrives inn en gyldig epost");
        return false;
    }
    return true;
}