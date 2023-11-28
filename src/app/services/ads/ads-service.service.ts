import { Injectable } from '@angular/core';
import { AdCategoryEnum } from 'src/app/models/enums/AdCategoriesEnum';
import { AdData } from 'src/app/models/interfaces/AdData';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

    private readonly ads: Array<AdData> = [
        {
            id: 1,
            name: 'Combo toalhas de banho',
            description: 'Envolva-se em conforto após o banho com nosso combo de toalhas macias e absorventes, proporcionando uma experiência de spa no seu banheiro.',
            image: '../../../assets/bed-and-bath/combo-toalhas-de-banho.webp',
            price: 32.90,
            rating: 3,
            category: AdCategoryEnum.BED_AND_BATH,
        },
        {
            id: 2,
            name: 'Garrafa de café 1.8 litros',
            description: 'Desfrute de café quente por mais tempo com nossa garrafa térmica de 1.8 litros, mantendo sua bebida preferida na temperatura ideal.',
            image: '../../../assets/bed-and-bath/garrafa-de-cafe-1-ponto-8-litros.webp',
            price: 54.49,
            rating: 4,
            category: AdCategoryEnum.BED_AND_BATH,
        },
        {
            id: 3,
            name: 'Lençol de casal com bardado',
            description: 'Adicione um toque de elegância ao seu quarto com nosso lençol de casal bordado, combinando estilo e conforto para uma noite de sono tranquila.',
            image: '../../../assets/bed-and-bath/lençol-de-casal-com-bordado.jpg',
            price: 289.99,
            rating: 4,
            category: AdCategoryEnum.BED_AND_BATH,
        },
        {
            id: 4,
            name: 'Toalha de Mesa',
            description: 'Transforme suas refeições com nossa toalha de mesa elegante, proporcionando um toque de sofisticação à sua sala de jantar.',
            image: '../../../assets/bed-and-bath/toalha-de-mesa.webp',
            price: 61.29,
            rating: 5,
            category: AdCategoryEnum.BED_AND_BATH,
        },
        {
            id: 5,
            name: 'Ar condicionado',
            description: 'Equipado com um sistema de refrigeração poderoso, o ar condicionado é capaz de remover o calor excessivo do ar, promovendo uma sensação de frescor e bem-estar.',
            image: '../../../assets/appliances/ar-condicionado.jpg',
            price: 2299.90,
            rating: 5,
            category: AdCategoryEnum.APPLIANCES,
        },
        {
            id: 6,
            name: 'Máquina de café expresso',
            description: 'Desfrute do café perfeito com nossa máquina expresso: design elegante, tecnologia avançada e extração ideal para um sabor e aroma excepcionais. Uma experiência de barista no conforto da sua casa.',
            image: '../../../assets/appliances/maquina-de-cafe-expresso.jpg',
            price: 1389.99,
            rating: 5,
            category: AdCategoryEnum.APPLIANCES,
        },
        {
            id: 7,
            name: 'Ventilador de parede',
            description: 'Mantenha sua casa fresca e arejada com nosso ventilador de parede silencioso e potente, oferecendo conforto em dias quentes de maneira discreta e eficiente.',
            image: '../../../assets/appliances/ventilador-de-parede.webp',
            price: 210.18,
            rating: 4,
            category: AdCategoryEnum.APPLIANCES,
        },
        {
            id: 8,
            name: 'Máquina de lavar',
            description: 'Eficiência em cada ciclo - nossa máquina de lavar proporciona limpeza poderosa e economia de água, tornando a tarefa de lavar roupa mais simples e sustentável.',
            image: '../../../assets/appliances/maquina-de-lavar.webp',
            price: 1030.55,
            rating: 5,
            category: AdCategoryEnum.APPLIANCES,
        },
        {
            id: 9,
            name: 'Armário de 7 portas',
            description: 'Organize seus pertences com estilo em nosso armário espaçoso de 7 portas, oferecendo praticidade e design moderno para o seu espaço.',
            image: '../../../assets/furniture/armario-7-portas.jpg',
            price: 452.29,
            rating: 3,
            category: AdCategoryEnum.FURNITURE,
        },
        {
            id: 10,
            name: 'Cama de casal',
            description: 'Descanse com conforto e estilo em nossa cama de casal, criando um refúgio acolhedor no seu quarto.',
            image: '../../../assets/furniture/cama-de-casal.jpg',
            price: 299.70,
            rating: 5,
            category: AdCategoryEnum.FURNITURE,
        },
        {
            id: 11,
            name: 'Poltrona reclinável',
            description: 'Relaxe em grande estilo com nossa poltrona reclinável, combinando conforto ergonômico e design contemporâneo.',
            image: '../../../assets/furniture/poltrona-reclinavel.webp',
            price: 784.96,
            rating: 5,
            category: AdCategoryEnum.FURNITURE,
        },
        {
            id: 12,
            name: 'Sofá de 3 lugares',
            description: 'Reúna a família em torno do conforto do nosso sofá espaçoso, criando um espaço acolhedor para momentos especiais.',
            image: '../../../assets/furniture/sofa-de-3-lugares.webp',
            price: 499.99,
            rating: 4,
            category: AdCategoryEnum.FURNITURE,
        },
        {
            id: 13,
            name: 'Esfregão para pisos lisos',
            description: 'Facilite a limpeza da sua casa com nosso esfregão eficiente, projetado para lidar com os desafios diários de manter seus pisos impecáveis.',
            image: '../../../assets/tools-section/esfregao.webp',
            price: 29.99,
            rating: 4,
            category: AdCategoryEnum.TOOLS,
        },
        {
            id: 14,
            name: 'Kit de Ferramentas',
            description: 'Esteja preparado para qualquer tarefa com nosso kit de ferramentas abrangente, fornecendo as ferramentas essenciais para projetos em casa.',
            image: '../../../assets/tools-section/kit-ferramentas.jpg',
            price: 99.90,
            rating: 5,
            category: AdCategoryEnum.TOOLS,
        },
        {
            id: 15,
            name: 'Pá de Bico',
            description: 'Limpeza eficaz em cantos e fendas com nossa pá de bico, garantindo que nenhum resíduo escape à sua atenção.',
            image: '../../../assets/tools-section/pa-de-bico.jpeg',
            price: 39.90,
            rating: 5,
            category: AdCategoryEnum.TOOLS,
        },
        {
            id: 16,
            name: 'Vassoura de Pelo 60cm',
            description: 'Mantenha seus espaços impecáveis com nossa vassoura de pelo de 60cm, oferecendo uma varredura eficiente e fácil.',
            image: '../../../assets/tools-section/vassoura-de-pelo-60cm.jpeg',
            price: 18.55,
            rating: 4,
            category: AdCategoryEnum.TOOLS,
        },
    ];

    public findAllProducts(): Promise<Array<AdData>> {
        return Promise.resolve(this.ads);
    }

}
