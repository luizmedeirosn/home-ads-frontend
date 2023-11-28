import { Component } from '@angular/core';

import { IconDefinition, faArrowDown, faCartFlatbed, faTv, faCouch, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';


interface EventItem {
    category: string;
    icon: IconDefinition;
    color: string;
    description: string;
}

@Component({
    selector: 'app-home-description',
    templateUrl: './home-description.component.html',
    styleUrls: [],
    styles: [ `
        :host {
            @keyframes slidedown {
                0% {
                    transform: translateY(0);
                }

                50% {
                    transform: translateY(10px);
                }

                100% {
                    transform: translateY(0);
                }
            }

            .slidedown {
                animation: slidedown;
                animation-duration: 2s;
                animation-iteration-count: infinite;
            }
        }
    `
]
})
export class HomeDescriptionComponent {

    public readonly faArrowDownIcon: IconDefinition = faArrowDown;

    public readonly events: EventItem[] = [
        { category: 'Cama, mesa e banho', icon: faCartFlatbed, color: 'var(--cyan-500)', description: 'Descubra os melhores produtos para o conforto do seu lar. Explore avaliações para garantir que cada compra contribua para noites de sono tranquilas e momentos agradáveis à mesa.'},
        { category: 'Eletrodomésticos', icon: faTv, color: 'var(--purple-500)', description: 'Encontre análises detalhadas e opiniões reais sobre uma variedade de eletrodomésticos, desde geladeiras até aspiradores de pó. Tome decisões de compra mais inteligentes com a ajuda da nossa comunidade.' },
        { category: 'Móveis', icon: faCouch, color: 'var(--orange-500)', description: 'Transforme sua casa com móveis de qualidade. De sofás a mesas de jantar, nossos usuários compartilham experiências para ajudar você a escolher peças que combinem com seu estilo de vida.' },
        { category: 'Ferramentas', icon: faScrewdriverWrench, color: 'var(--teal-500)', description: 'Seja um profissional ou um entusiasta do faça-você-mesmo, encontre as melhores ferramentas para sua casa avaliadas pelos nossos membros. Faça escolhas informadas para projetos bem-sucedidos.' }
    ];

}
