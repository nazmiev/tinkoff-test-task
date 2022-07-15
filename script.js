function bind(events, selector, handler) {
    document.querySelectorAll(selector).forEach(element => {
        element.addEventListener(events, handler);
    })
}

function ready() {
    var modal = new bootstrap.Modal('#exampleModal');
    var modal_title = modal._element.querySelector('.modal-title');
    
    modal.show();
    bind('click', '[role="save-creds"]', function (e) {
        let operator = document.getElementById("operName").value;
        let client = document.getElementById("clientName").value;

        document.querySelectorAll('[role="operator"]').forEach(element => {
            element.innerText = operator;
        })
        document.querySelectorAll('[role="client"]').forEach(element => {
            element.innerText = client;
        })

        modal.hide();
    })


    bind('change', '[data-step-id] [type="radio"]', function(e) {
        let tabId = this.dataset.tab;
        if (tabId) {
            // переходим на вкладку указанную в таб айди
            document.querySelector(tabId) && document.querySelector(tabId).click();
            return;
        }
        
        let stepId = parseInt(this.closest('[data-step-id]').dataset.stepId);
        
        if (this.value == "yes" && this.checked) {
            // показываем n+1 шаг
            // скрываем  шаги у которого > n + 1
            document.querySelectorAll('[data-step-id]').forEach(element => {
                if (element.dataset.stepId == (stepId + 1)) {
                    element.classList.remove('d-none');
                    element.classList.add('table-info');
                }
                else {
                    element.classList.remove('table-info');
                }
                if (element.dataset.stepId > (stepId + 1)) {
                    element.classList.add('d-none');
                }
            })
    
    
        }
        else {
            // скрываем  шаги у которого > n
            document.querySelectorAll('[data-step-id]').forEach(element => {
                if (element.dataset.stepId > (stepId)) {
                    element.classList.add('d-none');
                    element.querySelectorAll('[type="radio"]').forEach(radio => {
                        radio.checked = false;
                    })
                }
            })
        }
    })

    bind('click', '[role="finito"]', function(e) {
        window.location.reload()
    })

}
document.addEventListener('DOMContentLoaded', ready);



