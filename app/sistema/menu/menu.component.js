"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var globals_1 = require('../../globals');
var router_1 = require('@angular/router');
var MenuComponent = (function () {
    function MenuComponent(http, globals, router) {
        this.http = http;
        this.globals = globals;
        this.router = router;
        this.mensagem = null;
        this.menu = null;
        this.userName = null;
        this.__menu = [];
        this.userName =
            (localStorage.getItem("userName") === null) ?
                null : localStorage.getItem("userName");
    }
    MenuComponent.prototype.setUserName = function (userName) {
        if (localStorage.getItem("userName") === null)
            localStorage.setItem("userName", userName);
        this.userName = userName;
    };
    MenuComponent.prototype.ngOnInit = function () {
        this.getMenu(1);
        //this.menu = '<li class="treeview" title="2-6"><a href="#"><i class="fa fa-share"></i><span>Menu</span><span class="pull-right pull-right-menu"><span class="glyphicon glyphicon-chevron-left rotate"></span></span></a><ul class="treeview-menu"><li class="treeview li-2" title="4-5"><a href="#" style="padding-left: 15px">Usuários<span class="pull-right pull-right-menu"><span class="glyphicon glyphicon-chevron-left rotate"></span></span></a><ul class="treeview-menu ul-2"><li class="treeview li-4"><a href="#" style="padding-left: 30px">cadastrar</a></li><li class="treeview li-5"><a href="#" style="padding-left: 30px">listar</a></li></ul></li><li class="treeview li-6" title="7-8"><a href="#" style="padding-left: 15px">Pessoas<span class="pull-right pull-right-menu"><span class="glyphicon glyphicon-chevron-left rotate"></span></span></a><ul class="treeview-menu ul-6"><li class="treeview li-7"><a href="#" style="padding-left: 30px">cadastrar</a></li><li class="treeview li-8" title="9-10"><a href="#" style="padding-left: 30px">listar<span class="pull-right pull-right-menu"><span class="glyphicon glyphicon-chevron-left rotate"></span></span></a><ul class="treeview-menu ul-8"><li class="treeview li-9" title="11-12"><a href="#" style="padding-left: 45px">simples<span class="pull-right pull-right-menu"><span class="glyphicon glyphicon-chevron-left rotate"></span></span></a><ul class="treeview-menu ul-9"><li class="treeview li-11"><a href="#" style="padding-left: 60px">nome</a></li><li class="treeview li-12" title="13"><a href="#" style="padding-left: 60px">sei lá<span class="pull-right pull-right-menu"><span class="glyphicon glyphicon-chevron-left rotate"></span></span></a><ul class="treeview-menu ul-12"><li class="treeview li-13"><a href="#" style="padding-left: 75px">sei la 2</a></li></ul></li></ul></li><li class="treeview li-10"><a href="#" style="padding-left: 45px">elaborada</a></li></ul></li></ul></li></ul></li>';
    };
    MenuComponent.prototype.ngAfterViewInit = function () {
        $(".treeview")
            .hide()
            .first()
            .show()
            .click(function (event) {
            event.preventDefault();
            $(event.target)
                .parents("li.treeview")
                .first()
                .find("a")
                .first()
                .find("span.rotate")
                .toggleClass("down");
            if (typeof $(event.target).parents("li.treeview").attr("title") == "undefined") {
                return false;
            }
            $(event.target)
                .parents("li.treeview")
                .attr("title")
                .split("-")
                .map(function (item) {
                var identUL = ".ul-" + item;
                var identLI = ".li-" + item;
                if ($(identUL).length >= 1) {
                    $(identUL).parent("li").slideToggle("slow");
                }
                else if ($(identLI).length >= 1) {
                    $(identLI).slideToggle("slow");
                }
            });
        });
    };
    MenuComponent.prototype.testar = function (event) {
        event.preventDefault();
        console.log("event", event.target);
    };
    MenuComponent.prototype.createHtmlMenu = function (menu) {
        console.log('menu', menu);
        var ids, sub, str = null;
        //if (menu.sub) {
        //  ids = menu.sub.map(item => item.id).join('-');
        //  sub = menu.sub.map(item => `
        //    <li class="treeview li-${item.id}" data-id="${item.id}">
        //      <a href="#" style="padding-left: 15px" onclick="actionMenu(event)">
        //        ${item.descricao}
        //        <span class="pull-right pull-right-menu">
        //          <span class="glyphicon glyphicon-chevron-left rotate"></span>
        //        </span>
        //      </a>
        //    <li>`).join(``);
        //}
        str = "<li class=\"treeview\" data-id=\"" + menu.id + "\" data-padding=\"0\">\n             <a href=\"#\" class=\"link-menu\" onclick=\"actionMenu(event)\">\n               " + menu.descricao + "\n               <span class=\"pull-right pull-right-menu\">\n                 <span class=\"glyphicon glyphicon-chevron-left rotate\"></span>\n               </span>\n             </a>\n           </li>";
        //this.menu = (menu.sub) ? `${str}<ul>${sub}</ul></li>` : `${str}<li>`;
        //this.inicializarMenu();
        this.menu = str;
    };
    MenuComponent.prototype.inicializarMenu = function () {
        var _this = this;
        if ($(".treeview").length == 0) {
            setTimeout(function () {
                _this.inicializarMenu();
            }, 1000);
        }
        else {
            $(".treeview").hide().first().show();
        }
    };
    MenuComponent.prototype.getMenu = function (id) {
        var _this = this;
        var headers = new http_1.Headers();
        var authToken = localStorage.getItem('auth_token');
        headers.append('Content-Type', 'application/json');
        headers.append('x-access-token', authToken);
        var url = this.globals.url + '/menus/menu/' + id;
        this.http.get(url, { headers: headers })
            .subscribe(function (res) {
            var menu = res.json();
            _this.__menu.push(menu);
            localStorage.setItem('menu', JSON.stringify(_this.__menu));
            if (id == 1)
                _this.createHtmlMenu(menu);
            if (typeof menu.sub != 'undefined')
                menu.sub.map(function (item) { return _this.getMenu(item.id); });
        }, function (error) {
            console.log('error', error);
            if (error.status == 0) {
                _this.mensagem = "Não foi possível conectar com o servidor.";
            }
            else if (error.status == 401) {
                _this.mensagem = "Usuário não encotrado.";
            }
            else {
                _this.mensagem = "Erro inesperado. Entre em contato com administrador.";
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MenuComponent.prototype, "mensagem", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MenuComponent.prototype, "menu", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MenuComponent.prototype, "userName", void 0);
    MenuComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'menu',
            providers: [globals_1.Globals],
            templateUrl: './menu.component.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, globals_1.Globals, router_1.Router])
    ], MenuComponent);
    return MenuComponent;
}());
exports.MenuComponent = MenuComponent;
//# sourceMappingURL=menu.component.js.map