namespace ha {
    class HalDaftar extends ha.comp.BaseComponent {
        private url: string = 'http://localhost:8312/tenant-properties-service/default/properties';

        constructor() {
            super();
            this._template = `
                <div class="hal-daftar comp">
                    <div class="list-cont">
                    </div>
                </div>
            `;
            this.build();
        }

        litTps(): void {
            ha.comp.Util.Ajax(
                'get',
                this.url,
                '',
                [
                    {
                        key: "Authorization",
                        value: "OIDC_id_token " + ha.tps.token
                    }
                ]

            ).then((x: XMLHttpRequest) => {
                if (200 == x.status) {
                    let str: string = x.responseText;
                    let obj: any = JSON.parse(str);
                    let member: any[] = obj["hydra:member"];

                    member.forEach((item: any) => {
                        item;
                        let view: Item = new Item();
                        view;
                        //TODO:
                    })

                    console.log(obj["hydra:member"][0]["vcfg:name"]);
                    console.log(obj["hydra:member"][0]["vcfg:value"]);
                }
            }).catch((e) => {
                console.error(e);
                ha.comp.dialog.tampil(e.message);
            });
        }

        get listCont(): HTMLDivElement {
            return this.getEl('div.list-cont') as HTMLDivElement;
        }

    }

    class Item extends ha.comp.BaseComponent {
        private item: any;

        constructor() {
            super();
            this._template = `
                <div class='tps-item comp'>
                    <div class='key'></div>
                    <div class='value'></div>
                </div>
            `;
            this.build();

            this.item;
        }
    }

    export var halDaftar: HalDaftar = new HalDaftar();
}