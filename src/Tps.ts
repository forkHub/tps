namespace ha {
    export class Kons {
        readonly grandType = "password";
        static readonly password = "apiclient";
        static readonly urlToken = `http://localhost:8280/oidc-token-service/default/token?grant_type=password&password=apiclient&username=apiclient&client_id=default&scope=tags openid tags content_entitlements em_api_access`;
    }

    export class Tps {
        private _token: string = '';
        public get token(): string {
            return this._token;
        }

        init() {
            ha.comp.Util.Ajax2("post", ha.Kons.urlToken, "").then((r: string) => {
                // console.log(r);
                let obj: any = JSON.parse(r);
                // console.log(obj);
                this._token = obj.access_token;
                // console.log("====================");
                ha.halDaftar.litTps();
            }).catch((e) => {
                console.error(e);
            });

        }
    }

    export var tps: Tps = new Tps();
}

window.onload = () => {
    let tps: ha.Tps = ha.tps;
    tps.init();
}
