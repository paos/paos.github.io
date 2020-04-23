if (typeof(tradeController)=="undefined") {
    class TradeController {
        constructor() {
            this.buttons = []
        }

        createButton(color, label, div) {
            let span = document.createElement("span")
            span.innerHTML = `&nbsp;&nbsp;`
            div.appendChild(span);
            let btn = document.createElement("span")
            btn.className = `button ${color}`;
            btn.innerHTML = `<span class="left">&nbsp;</span><span class="mid" style="width:20px;">${label}</span><span class="right">&nbsp;</span>
</span>`
            div.appendChild(btn);
            return [span,btn];
        }

        cleanUp() {
            for (let button of this.buttons) {
                button.remove()
            }
            this.buttons = []
        }

        addButtonUI() {
            this.cleanUp()
            this.table = $("#divCurrentPositions table")[1]
            this.traderows = $(this.table).find("tr").toArray().slice(2)

            for (let i = 0; i < this.traderows.length; i++) {
                let row = this.traderows[i];
                var cell = $(row).find("td")[0];
                var div = $(cell).find(".marketName")[0];
                let idx = i; let span,btn;
                [span,btn] = this.createButton("blue", "100%", div);
                $(btn).on("mousedown", ((e) => {this.onBtnClick(idx, "100%")}).bind(this));
                this.buttons = this.buttons.concat([span,btn]);
                [span,btn]  = this.createButton("green", "50%", div);
                $(btn).on("mousedown", ((e) => {this.onBtnClick(idx, "50%")}).bind(this));
                this.buttons = this.buttons.concat([span,btn]);
                [span,btn]  = this.createButton("red", "25%", div);
                $(btn).on("mousedown", ((e) => {this.onBtnClick(idx, "25%")}).bind(this));
                this.buttons = this.buttons.concat([span,btn]);
            }
        }

        onBtnClick(i, size) {
            let params = this.getRowValues(i);
            params.unshift(size);
            this.msg.apply(this, params)
        }

        msg(size, market, action, open, stop) {
            switch (market) {
                case "UK 100": market = "🇬🇧 FTSE 100 INDEX"; break
                case "Germany 30": market = "🇩🇪 GERMAN DAX INDEX"; break
                case "Wall Street 30": market = "🇺🇸 DOW JONES INDEX\n"; break
            }
            action = action == "Sell" ? "SOLD SHORT 🔻" : "BOUGHT LONG ⬆"
            window.alert(`${market}\n${action} = ${size}\n${open} entry\n${stop} stop loss`)
        }

        getRowValues(i) {
            let cells = $(this.traderows[i]).find("td");
            let market = $(cells[0]).find(".marketName")[0].firstChild.textContent;
            let action = cells[1].textContent;
            let open = cells[3].textContent;
            let stop = cells[6].textContent;
            return [market, action, open, stop];
        }
    }

    var tradeController = new TradeController();
}
tradeController.addButtonUI()

