import React, { useState, useRef, useEffect } from 'react'
import useListItemToggle from '../../hooks/useListItemToggle'
import useInput from '../../hooks/useInput'
import styled from 'styled-components'
import { 
    FormControl, 
    FormControlLabel,
    FormLabel,
    InputLabel, 
    Input,
    Radio,
    RadioGroup
} from '@material-ui/core';
import { styled as Mui_styled } from '@material-ui/styles'
import { players } from '../../db'

const Form = styled.form`
    /* width: 80%;
    margin: 20px auto 0;
    padding: 20px; */
`
const P = styled.p`
    margin-top: 20px;
    font-weight: 700;
`
const ButtonListItem = styled.li`
    padding: 10px;
    margin: 5px;
    border: 1px solid rgb(122, 213, 178);
    width: 50%;
    @media (max-width: 700px) {
        width: 100%;
    }
`
const SaveButton = styled.button`
    margin-top: 1.2em;
`
const MuiFormControl = Mui_styled(FormControl)({
    marginTop: 10,
    width: '60%',
    // minWidth: 320,
    '@media (max-width: 700px)': {
        width: '100%'
    }
})

export default function CreateRound() {
    const [activePlayers, setToggleActivePlayer] = useListItemToggle([])
    const [inputValues, setInputValue] = useInput({
        roundDate: '', course: '', holesPlayed: '', roundName: ''
    })

    const [dateInputFocused, setInputFocus] = useState(false)
    const inputRef = useRef()
    function focusInput() {
        inputRef.current.focus()
        setInputFocus(true)
    }
    function blurInput() {
        inputRef.current.blur()
        setInputFocus(false)
    }

    // console.log('inputValues: ', inputValues)
    // console.log('activePlayers: ', activePlayers)

    return (
        <div>
            <Form 
                // TODO: setup axios post request
                // onSubmit={}
            >
                {/* TODO: maybe move these different controls to their own component */}
                <h2>Create New Round</h2>
                <MuiFormControl>
                    <InputLabel htmlFor="roundDate">Round Date</InputLabel>
                    <Input 
                        type={dateInputFocused || inputValues.roundDate ? "date" : "text"}
                        name="roundDate"
                        onChange={setInputValue}
                        value={inputValues.roundDate}
                        ref={inputRef}
                        onFocus={focusInput}
                        onBlur={blurInput}
                    />
                </MuiFormControl>
                <br />

                <MuiFormControl>
                    <InputLabel htmlFor="course">Course</InputLabel>
                    <Input 
                        type="text"
                        name="course"
                        onChange={setInputValue}
                        value={inputValues.course}
                    />
                </MuiFormControl>
                <br />

                <MuiFormControl>
                    <InputLabel htmlFor="course">Round Name</InputLabel>
                    <Input 
                        type="text"
                        name="roundName"
                        onChange={setInputValue}
                        value={inputValues.roundName}
                    />
                </MuiFormControl>
                <br />

                {/* TODO: what to put for component? No value looks like I want it to, otherwise the label is inline instead of block */}
                {/* TODO: if 9 holes is selected render section for entering the course's slope rating for that 9. (https://www.usga.org/articles/2014/07/only-time-for-nine-you-can-still-post-your-score-21474870775.html) */}
                <MuiFormControl component="">
                    <FormLabel 
                        component="label"
                        style={{marginTop: '20px'}}
                    >
                        Holes
                    </FormLabel>
                    <RadioGroup 
                        aria-label="holesPlayed"
                        name="holesPlayed" 
                        value={inputValues.holesPlayed} 
                        onChange={setInputValue}
                    >
                        <FormControlLabel 
                            value="18" 
                            control={<Radio color="primary" />} 
                            label="18" 
                        />

                        <FormControlLabel 
                            value="9" 
                            control={<Radio color="primary" />} 
                            label="9" 
                        />
                    </RadioGroup>
                </MuiFormControl>

                <P>Select Players to Activate for this Round</P>
                <ul>
                    {players.map(player => {
                        return (
                            <ButtonListItem
                                key={player.id}
                                onClick={() => setToggleActivePlayer(player.id)}
                                className={activePlayers.includes(player.id) 
                                    ? 'buttonListItem activeListItem' 
                                    : 'buttonListItem'
                                }
                                // TODO: add onKeyPress (return/enter key) handler?
                                tabIndex="0"
                            >
                                {player.name}
                            </ButtonListItem>
                        )
                    })}
                </ul>

                <SaveButton>Save Round</SaveButton>
            </Form>
        </div>
    )
}
