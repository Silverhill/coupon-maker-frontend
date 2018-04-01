import React, { Component } from 'react';
import { Panel, InputBox, Icon, Cupon, InputNested } from 'coupon-components';
import styles from '../../NewCampaing/NewCampaing.css';

class FirstStep extends Component {
  render() {
    const pizzaHut = {
      maker: {
        image: 'https://aalfredosalinas.files.wordpress.com/2010/09/pizza-hut-logo1.jpg',
        cupons: 125,
        hunted: 50
      },
      cupon: {
        image: 'https://i2.wp.com/food.thecookbk.com/wp-content/uploads/2017/10/pizza-hut.jpg?fit=800%2C600',
        date: '11 Feb - 20 May 2017',
        promo: 'Martes 2 x 1 en pizzas',
        address: '12-34 Downtown S.Q'
      }
    }

    return (
      <div>
        <Panel title="Previsualización">
          <div className={styles.previewCampaing}>
            <div className={styles.uploadImage}>
              <Icon name="FaCamera" size={50} />
            </div>
            <Cupon data={pizzaHut} className={styles.campaing}/>
          </div>
        </Panel>
        <Panel title="Información Básica">
          <InputBox
            type="text"
            placeholder="Escribe un nombre creativo de tu campaña"
            labelText="Cual es el nombre de tu campaña?"
          />
          <InputBox
            type="text"
            placeholder="Ingresa una descripción especifica de tu promoción"
            labelText="Descripción corta de tu campaña (Opcional)"
          />
          <InputBox
            type="text"
            placeholder="Ingresa la dirección donde se va a hacer efectivo el cupón, principal o Sucursal"
            labelText="Cual es la dirección de tu empresa?"
          />
          <InputBox
            type="text"
            placeholder="Si prefieres escribir tu mensaje… eje: 2x1"
            labelText="Personaliza tu mensaje"
          />
          <InputNested labelText="Duración(Elige el rango de duración para tu campaña.)">
            <InputBox
              type="text"
              placeholder="2017/1/20"
            />
            <InputBox
              type="text"
              placeholder="2017/2/20"
            />
          </InputNested>
        </Panel>
      </div>

    )
  }
}

export default FirstStep;