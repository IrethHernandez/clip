import React, { useState } from 'react'
import styled from 'styled-components'
import InputMask from 'react-input-mask'
import creditCardType, { getTypeInfo, types as CardType } from 'credit-card-type';

/**** Styles ****/
const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Container = styled.article`
    width: 90%;
    max-width: 500px;
    background: white;
    position: relative;
    padding: 1rem 1.3rem;
    padding-top: 7rem;
    margin: 1rem 0;
    border: solid #f7f7f9;
    border-width: .2rem 0 0;
    box-shadow: 4px 5px 13px #abd1e6;
    border-radius: .55rem;
    @media screen and (max-width: 768px) {
        margin-top: 70px;
    }

`
const Row = styled.div`
    width: 100%;
    display: flex;
    margin: 0 -0.75rem;
    @media screen and (max-width: 768px) {
        flex-direction: column;
        margin: 0;
    }
`

const Col = styled.div`
    width: 100%;
    padding: 0 0.75rem;
    @media screen and (max-width: 768px) {
        padding: 0;
    }
`

const ColHalf = styled.div`
    width: 50%;
    padding: 0 0.75rem;
    @media screen and (max-width: 768px) {
        width: 100%;
        padding: 0;
    }
`

const ColOneThird = styled.div`
    width: 33.33333%;
    padding: 0 0.75rem;
    @media screen and (max-width: 768px) {
        width: 100%;
        padding: 0;
    }
`

const ColTwoThird = styled.div`
    width: 66.66666%;
    padding: 0 0.75rem;
    @media screen and (max-width: 768px) {
        width: 100%;
        padding: 0;
    }
`

const Input = styled.input`
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    margin-bottom: 1rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    height: 38px;
`

const Label = styled.label`
    display: inline-block;
    margin-bottom: .5rem;
`

const Button = styled.button`
    display: block;
    width: 100%;
    font-size: 15px;
    padding: 10px 0;
    border-radius: .25rem;
    color: white;
    background: #005bcf;
`

const Card = styled.div`
    position: absolute;
    width:400px;
    top: -140px;
    left: 50%;
    transform: translateX(-50%) scale(1);
    border-radius: .55rem;
    height: 230px;
    background: black;
    padding: 4%;
    @media screen and (max-width: 768px) {
       transform: translateX(-50%) scale(0.6);
       top: -100px;
    }
`

const H2 = styled.h2`
    color: white;
    font-size: 28px;
`

const Hologram = styled.div`
    width: 60px;
    height: 50px;
    background: lightblue;
    border-radius: 5px;
`

const RowCard = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`

const Type = styled.h3`
    font-size: 40px;
    color: white;
    margin: 0;
    text-align: right;
`

const RowData = styled(Row)`
    @media screen and (max-width: 768px){
        flex-direction: row !important;
    }
`

const ColOneThirdCard = styled(ColOneThird)`
    @media screen and (max-width: 768px){
        width: 33.33333% !important;
    }
`

const ColTwoThirdCard = styled(ColTwoThird)`
    @media screen and (max-width: 768px){
        width: 66.66666% !important;
    }
`

const P = styled.p`
    color: white;
`

const Name = styled.h4`
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 15px;
    margin-top: 0;
`

/**** Component ****/
const Checkout = () =>{

    /**** Variables ****/
    const months = 12;
    const yearEnd = 2100;
    let optionsMonth = [];
    let optionsYear = [];
    let  month = 1, yearStart = 2020,  monthsArr = [],  yearsArr = [];
    const [ code, setCode ] = useState({
        name: 'CCV',
        size: 3
    })
    const [ cardData, setCardData ] = useState({
        cardNumber: '', 
        cardHolder: '',
        cardMonth: '',
        cardYear: '',
        cardCCV: '',
        cardType: 'MasterCard'
    })
    const [ validations, setValidations ] = useState({
        cardNumber: false, 
        cardHolder: false,
        cardMonth: false,
        cardYear: false,
        cardCCV: false,
    })

    /**** Operations ****/
    while (month <= months) {
        monthsArr.push(month);
        month++;
    }
    while (yearStart <= yearEnd) {
        yearsArr.push(yearStart);
        yearStart++;
    }
    
    optionsMonth = monthsArr.map((item, key) => <option value={item < 10 ? `0${item}` : `${item}`} key={key}>{item < 10 ? `0${item}` : `${item}`}</option>);
    optionsYear = yearsArr.map((item, key) => <option value={item} key={key}>{item}</option>);
    
    /**** Functions ****/

    /**** Toma los datos del campo y los envía al objeto correspondiente ****/
    const setData = (e) => {
        setCardData({...cardData, [e.target.name]: e.target.value})
        if(e.target.name === 'cardNumber'){
            let typeCard = creditCardType(e.target.value);
            if(typeCard[0]){
                setCode({...code, ['size']: typeCard[0].code.size, ['name']: typeCard[0].code.name})
                setCardData({...cardData, ['cardType']: typeCard[0].niceType})
           }
        }
    }
    /**** Valida los datos y avisa al usuario si hay errores. Si todo está bien, envía el formulario ****/
    const submit = (e) => {
        e.preventDefault();
        console.log(validations)
        /**** Número de tarjeta ****/
        if(cardData.cardNumber.length === 0 || cardData.cardNumber.indexOf('_') !== -1){
            setValidations({...validations, ...validations.cardNumber = true});
        }else{
            setValidations({...validations, ...validations.cardNumber = false});
        }
        /**** Nombre del titular ****/
        if(cardData.cardHolder.length === 0){
            setValidations({...validations, ...validations.cardHolder = true});
        }else{
            setValidations({...validations, ...validations.cardHolder = false});
        }
        /**** Selección del mes de expiración****/
        if(cardData.cardMonth.length === 0){
            setValidations({...validations, ...validations.cardMonth = true});
        }else{
            setValidations({...validations, ...validations.cardMonth = false});
        }
        /**** Selección del año de expiración****/
        if(cardData.cardYear.length === 0){
            setValidations({...validations, ...validations.cardYear = true});
        }else{
            setValidations({...validations, ...validations.cardYear = false});
        }
        /**** Número CCV ****/
        if(cardData.cardCCV.length === 0 || cardData.cardCCV.indexOf('_') !== -1){
            setValidations({...validations, ...validations.cardCCV = true});
        }else{
            setValidations({...validations, ...validations.cardCCV = false});
        }
        /**** Comprobamos que todos los campos sean válidos ****/
        let canSend = Object.values(validations).some(el => el === false)
        /**** Si lo son, envía el formulario ****/
        if (canSend) {
            sendData();
        }
    }

    /**** Envía el formulario al Backend ****/
    const sendData = () => {
        
    }

    /**** Render ****/
    return (<Section>
        <Container>
            <Card>
                <RowCard>
                    <Hologram/>
                    <Type>{ cardData.cardType }</Type>
                </RowCard>
                <H2>
                    { cardData.cardNumber }
                </H2>
                <RowData>
                    <ColTwoThirdCard>
                        <P>Card Holder</P>
                        <Name>{ cardData.cardHolder }</Name>
                    </ColTwoThirdCard>
                    <ColOneThirdCard>
                        <P>Expires</P>
                        <Name>{cardData.cardMonth}/{cardData.cardYear}</Name>
                    </ColOneThirdCard>
                </RowData>
            </Card>
            <form>
                <Label>Card Number</Label>
                <InputMask mask="9999999999999999" value={cardData.cardNumber} onChange={(e) => setData(e)}>
                    {(inputProps) =>  <Input type='text' name="cardNumber" {...inputProps} className={validations.cardNumber && 'error'}/>}
                </InputMask>
                 
                <Label>Card Name</Label>
                <Input type='text' value={cardData.cardHolder} onChange={(e) => setData(e)} name="cardHolder" className={validations.cardNumber && 'error'}/>
                <Row>
                    <ColTwoThird>
                        <Row>
                            <ColTwoThird>
                                <Label>Expiration Date</Label>
                            </ColTwoThird>
                        </Row>
                        <Row>
                            <ColHalf>
                                <Input as='select' value={cardData.cardMonth} onChange={(e) => setData(e)} name="cardMonth" className={validations.cardMonth && 'error'}>
                                    <option>Month</option>
                                    {optionsMonth}
                                </Input>
                            </ColHalf>
                            <ColHalf>
                                <Input as='select' value={cardData.cardYear} onChange={(e) => setData(e)} name="cardYear" className={validations.cardYear && 'error'}>
                                    <option>Year</option>
                                    {optionsYear}
                                </Input>
                            </ColHalf>
                        </Row>
                    </ColTwoThird>
                    <ColOneThird>
                        <Row>
                            <ColOneThird>
                                <Label>{code.name}</Label>
                            </ColOneThird>
                        </Row>
                        <Row>
                            <Col>
                            <InputMask mask={'9'.repeat(code.size)} value={cardData.cardCCV} onChange={(e) => setData(e)}>
                                {(inputProps) =>  <Input type='text' name="cardCCV" {...inputProps} className={validations.cardCCV && 'error'}/>}
                            </InputMask>
                            </Col>
                        </Row>
                    </ColOneThird>
                </Row>
                <Button onClick={(e) => submit(e)}>Submit</Button>
            </form>
        </Container>
        
    </Section>)
}

export default Checkout;