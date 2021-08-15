let optionValue = "",
  amountValue = 0,
  descriptionValue = "",
  CreditValue = 0,
  DebitValue = 0,
  //
  tableObj = null,
  currentRow = "",
  currentOptionHtml = "",
  currentDescriptionHtml = "",
  currentCreditHtml = "",
  currentDebitHtml = "";

$(document).ready(function () {
  $(".form-select").change(function () {
    optionValue = $(this).val();
  });
  $(".amount-input").change(function () {
    amountValue = Number($(this).val());
  });
  $(".TypeInput").change(function () {
    // debugger;
    let TypeValue = $("input[name=radio-stacked]:checked").val();
    if (TypeValue != "Credit") {
      DebitValue = amountValue;
      CreditValue = 0;
      return;
    }
    CreditValue = amountValue;
    DebitValue = 0;
  });
  $(".description-input").change(function () {
    descriptionValue = $(this).val();
  });

  $(".ok-model").click(function () {
    if ($(".ok-model").text() == "Add") {
      $(".tbody").append(`              
      <tr>
      <td class = "option"> ${optionValue} </td>
      <td class = "description">${descriptionValue} </td>
      <td class = "Credit"> ${CreditValue} </td>
      <td class = "Debit">  ${DebitValue} </td>
      <td>
      <button class="btn btn-warning EditRow"  data-bs-toggle="modal" data-bs-target="#staticBackdrop" >
      <i class="fa fa-edit" aria-hidden="true"> Edit</i></button> 
      <button class="btn btn-danger deleteRow" ><i class="fa fa-trash-o" aria-hidden="true">
      </i> Delete</button>
      </td>
      </tr>
      `);
    } else {
      currentRow.children(".option").text(optionValue);
      currentRow.children(".description").text(descriptionValue);
      if (currentCreditHtml != 0) {
        currentRow.children(".Credit").text(amountValue);
        return;
      }
      currentRow.children(".Debit").text(amountValue);

      $(".ok-model").text("Add");
    }
    $(".Journal-Form")[0].reset();
    changeSummaries();
  });

  $(document).on("click", ".deleteRow", function () {
    $(this).parents("tr").remove();
  });

  $(document).on("click", ".EditRow", function () {
    $(".ok-model").text("Edit");
    currentRow = $(this).parents("tr");
    currentOptionHtml = currentRow.children(".option").text();
    currentDescriptionHtml = currentRow.children(".description").text();
    currentCreditHtml = Number(currentRow.children(".Credit").text());
    currentDebitHtml = Number(currentRow.children(".Debit").text());
    $(`.form-select option[value=${currentOptionHtml}]`).attr(
      "selected",
      "selected"
    );

    if (currentCreditHtml != 0) {
      $(".amount-input").val(currentCreditHtml);
      $("input[value=Credit]").attr("checked", "checked");
    } else {
      $("input[value=Debit]").attr("checked", "checked");
      $(".amount-input").val(currentDebitHtml);
    }
    $(".description-input").val(currentDescriptionHtml);
  });

  /***********      footer btn & Summaries     *************/

  function changeSummaries() {
    let CreditSummaries = 0,
      DebitSummaries = 0;
    $(".CreditSummaries").text((CreditSummaries += Number(CreditValue)));
    $(".DebitSummaries").text((DebitSummaries += Number(DebitValue)));
    $(".BalanceSummaries").text(CreditSummaries - DebitSummaries);
  }

  $(".btn-save").click(function () {
    tableObj = $("table");
    $(".header-form").after(`
  <div class="alert alert-primary alert-dismissible" role="alert" id="liveAlert">
  <strong>Nice!</strong> Voucher saved
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>  
  
`);
  });

  $(".btn-post").click(function () {
    tableObj = $(".table").html;
    $(".btn").attr("disable", "disable");
    $(".header-form").after(`
  <div class="alert alert-success alert-dismissible" role="alert" id="liveAlert"> posted  
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
`);
  });

  $(".btn-delete").click(function () {
    $(".header-form").after(`
  <div class="alert alert-warning alert-dismissible" role="alert" id="liveAlert">
  <strong>wait!</strong> are you sure  <button class="btn btn-danger btn-sure-delete mx-1 px-5">yes sure, Delete</button>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
`);
  });
  $(document).on("click", ".btn-sure-delete", function () {
    $(".tbody").html("");
  });
});
