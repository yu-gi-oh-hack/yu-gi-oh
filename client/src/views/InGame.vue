<template>
    <div class="ingame-bg">
        <div class="player-status">
            <div class="name">
                Lutfi
            </div>
            <div class="lifepoint">
                LP: 2000
            </div>
        </div>
        <div class="actions">
            <ul>
                <li class="cursor-pointer" @click="endPhase">End Phase</li>
                <li class="cursor-pointer" >Chat</li>
            </ul>
        </div>
        <div class="opponent-status">
            <div class="name">
                Qoyyima
            </div>
            <div class="lifepoint">
                LP: 2000
            </div>
        </div>

        <!-- field -->
        <div class="battlefield"></div>
        <!-- opponent -->
        <div class="card-container">
            <div 
                @click="battleOpponentCard(0, rooms.opponentState.cardsInField[0].atk)"
                class="card-field cursor-pointer"
            >
                <img v-if="this.rooms.opponentState.cardsInField[0]" :src="this.rooms.opponentState.cardsInField[0].image_url_small" alt="">
            </div>
            <div 
                @click="battleOpponentCard(1, rooms.opponentState.cardsInField[1].atk)"
                class="card-field cursor-pointer"
            >
                <img v-if="rooms.opponentState.cardsInField[1]" :src="this.rooms.opponentState.cardsInField[1].image_url_small" alt="">
            </div>
            <div 
                @click="battleOpponentCard(2, rooms.opponentState.cardsInField[2].atk)"
                class="card-field cursor-pointer"
            >
                <img v-if="this.rooms.opponentState.cardsInField[2]" :src="this.rooms.opponentState.cardsInField[2].image_url_small" alt="">
            </div>
        </div>
        <!-- opponent -->

        <!-- player --> 
        <div class="card-container">
            <div 
                @click="battleMyCard(0, rooms.playerState.cardsInField[0].atk)"
                class="card-field cursor-pointer"
            >
                <img v-if="this.rooms.playerState.cardsInField[0]" :src="this.rooms.playerState.cardsInField[0].image_url_small" alt="">
            </div>
            <div 
                @click="battleMyCard(1, rooms.playerState.cardsInField[1].atk)"
                class="card-field cursor-pointer"
            >
                <img v-if="rooms.playerState.cardsInField[1]" :src="this.rooms.playerState.cardsInField[1].image_url_small" alt="">
            </div>
            <div 
                @click="battleMyCard(2, rooms.playerState.cardsInField[2].atk)"
                class="card-field cursor-pointer"
            >
                <img v-if="this.rooms.playerState.cardsInField[2]" :src="this.rooms.playerState.cardsInField[2].image_url_small" alt="">
            </div>
        </div>
        <!-- player -->

        <div class="battle-phase" v-if="rooms.playerState.choosenAttack>0">
            <p>Battle:</p>
            <div>
                Attack with: {{rooms.playerState.choosenAttack}} vs : {{rooms.opponentState.choosenAttack}}
            </div>
            <button 
                @click="battle"
                class="btn btn-danger">
                confirm
            </button>
        </div>
        <!-- field -->

        <!-- hand -->
        <div class="card-container" v-show="rooms.playerState.mainPhase" >
            <div 
                class="cursor-pointer relative"
                v-for="(card, index ) in rooms.playerState.cardsInHand"
                :key="index"
                @click="clickCard(card.id)"
            >
                <div class="card__tooltip" :class="index">
                    <div class="name">
                        {{card.name }}
                    </div>
                    <div>
                        {{card.desc}}
                    </div>
                    <div>
                        Atk: {{card.atk}} / Def: {{card.def}}
                    </div>
                </div>
                <img :src="card.image_url_small" alt="">
            </div>
        </div>
    </div>
</template>

<script>
// import deck from '@/config/yugioh-api'
import axios from 'axios';
import Card from '@/components/Card'

const deck = 
axios
.create({
    baseURL: 'https://db.ygoprodeck.com/api/v4/'
})

export default {
    name: 'InGame',
    components: {
        Card
    },
    data() {
        return {
            rooms: {
                    name: '',
                    players: [
                        {
                            name:'',
                            deck:[
                                {
                                    "id": "69455834",
                                    "name": "King of Yamimakai",
                                    "type": "Normal Monster",
                                    "desc": "Wields the power of darkness to destroy its enemies.",
                                    "atk": "2000",
                                    "def": "1530",
                                    "level": "5",
                                    "race": "Fiend",
                                    "attribute": "DARK",
                                    "set_tag": "DB2-EN046,MRD-074,MRD-E074,MRD-EN074,",
                                    "setcode": "Dark Beginning 2,Metal Raiders,Metal Raiders,Metal Raiders,",
                                    "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/69455834.jpg",
                                    "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/69455834.jpg"
                                },
                                {
                                    "id": "70781052",
                                    "name": "Summoned Skull",
                                    "type": "Normal Monster",
                                    "desc": "A fiend with dark powers for confusing the enemy. Among the Fiend-Type monsters, this monster boasts considerable force.\n\n(This card is always treated as an \"Archfiend\" card.)",
                                    "atk": "2500",
                                    "def": "1200",
                                    "level": "6",
                                    "race": "Fiend",
                                    "attribute": "DARK",
                                    "archetype": "Archfiend",
                                    "set_tag": "DEM1-EN001,YSYR-EN004,YGLD-ENA06,SYE-005,MIL1-EN028,SDY-004,SDY-004,DLG1-EN025,DEM2-EN002,LCJW-EN235,LCYW-EN010,DPYG-EN002,DB1-EN142,DT05-EN001,YAP1-EN003,MRD-003,RP01-EN024,BPT-002,MRD-EN003,SDY-E004,MRD-E003,",
                                    "setcode": "Demo Pack,Starter Deck: Yugi Reloaded,Yugi's Legendary Decks,Starter Deck: Yugi Evolution,Millennium Pack,Summoned Skull Sample promotional card,Starter Deck: Yugi,Dark Legends,Demo Deck 2015,Legendary Collection 4: Joey's World Mega Pack,Legendary Collection 3: Yugi's World Mega Pack,Duelist Pack: Yugi,Dark Beginning 1,Duel Terminal 5a,Anniversary Pack,Metal Raiders,Retro Pack,Booster Pack Collectors Tins 2002,Metal Raiders,Starter Deck: Yugi,Metal Raiders,",
                                    "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/70781052.jpg",
                                    "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/70781052.jpg"
                                },
                                {
                                    "id": "70781053",
                                    "name": "Summoned Skull",
                                    "type": "Normal Monster",
                                    "desc": "A fiend with dark powers for confusing the enemy. Among the Fiend-Type monsters, this monster boasts considerable force.\n\n(This card is always treated as an \"Archfiend\" card.)",
                                    "atk": "2500",
                                    "def": "1200",
                                    "level": "6",
                                    "race": "Fiend",
                                    "attribute": "DARK",
                                    "archetype": "Archfiend",
                                    "set_tag": "DEM1-EN001,YSYR-EN004,YGLD-ENA06,SYE-005,MIL1-EN028,SDY-004,SDY-004,DLG1-EN025,DEM2-EN002,LCJW-EN235,LCYW-EN010,DPYG-EN002,DB1-EN142,DT05-EN001,YAP1-EN003,MRD-003,RP01-EN024,BPT-002,MRD-EN003,SDY-E004,MRD-E003,",
                                    "setcode": "Demo Pack,Starter Deck: Yugi Reloaded,Yugi's Legendary Decks,Starter Deck: Yugi Evolution,Millennium Pack,Summoned Skull Sample promotional card,Starter Deck: Yugi,Dark Legends,Demo Deck 2015,Legendary Collection 4: Joey's World Mega Pack,Legendary Collection 3: Yugi's World Mega Pack,Duelist Pack: Yugi,Dark Beginning 1,Duel Terminal 5a,Anniversary Pack,Metal Raiders,Retro Pack,Booster Pack Collectors Tins 2002,Metal Raiders,Starter Deck: Yugi,Metal Raiders,",
                                    "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/70781053.jpg",
                                    "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/70781053.jpg"
                                },
                                {
                                    "id": "70781054",
                                    "name": "Summoned Skull",
                                    "type": "Normal Monster",
                                    "desc": "A fiend with dark powers for confusing the enemy. Among the Fiend-Type monsters, this monster boasts considerable force.\n\n(This card is always treated as an \"Archfiend\" card.)",
                                    "atk": "2500",
                                    "def": "1200",
                                    "level": "6",
                                    "race": "Fiend",
                                    "attribute": "DARK",
                                    "archetype": "Archfiend",
                                    "set_tag": "DEM1-EN001,YSYR-EN004,YGLD-ENA06,SYE-005,MIL1-EN028,SDY-004,SDY-004,DLG1-EN025,DEM2-EN002,LCJW-EN235,LCYW-EN010,DPYG-EN002,DB1-EN142,DT05-EN001,YAP1-EN003,MRD-003,RP01-EN024,BPT-002,MRD-EN003,SDY-E004,MRD-E003,",
                                    "setcode": "Demo Pack,Starter Deck: Yugi Reloaded,Yugi's Legendary Decks,Starter Deck: Yugi Evolution,Millennium Pack,Summoned Skull Sample promotional card,Starter Deck: Yugi,Dark Legends,Demo Deck 2015,Legendary Collection 4: Joey's World Mega Pack,Legendary Collection 3: Yugi's World Mega Pack,Duelist Pack: Yugi,Dark Beginning 1,Duel Terminal 5a,Anniversary Pack,Metal Raiders,Retro Pack,Booster Pack Collectors Tins 2002,Metal Raiders,Starter Deck: Yugi,Metal Raiders,",
                                    "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/70781054.jpg",
                                    "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/70781054.jpg"
                                },
                                {
                                    "id": "70781055",
                                    "name": "Summoned Skull",
                                    "type": "Normal Monster",
                                    "desc": "A fiend with dark powers for confusing the enemy. Among the Fiend-Type monsters, this monster boasts considerable force.\n\n(This card is always treated as an \"Archfiend\" card.)",
                                    "atk": "2500",
                                    "def": "1200",
                                    "level": "6",
                                    "race": "Fiend",
                                    "attribute": "DARK",
                                    "archetype": "Archfiend",
                                    "set_tag": "DEM1-EN001,YSYR-EN004,YGLD-ENA06,SYE-005,MIL1-EN028,SDY-004,SDY-004,DLG1-EN025,DEM2-EN002,LCJW-EN235,LCYW-EN010,DPYG-EN002,DB1-EN142,DT05-EN001,YAP1-EN003,MRD-003,RP01-EN024,BPT-002,MRD-EN003,SDY-E004,MRD-E003,",
                                    "setcode": "Demo Pack,Starter Deck: Yugi Reloaded,Yugi's Legendary Decks,Starter Deck: Yugi Evolution,Millennium Pack,Summoned Skull Sample promotional card,Starter Deck: Yugi,Dark Legends,Demo Deck 2015,Legendary Collection 4: Joey's World Mega Pack,Legendary Collection 3: Yugi's World Mega Pack,Duelist Pack: Yugi,Dark Beginning 1,Duel Terminal 5a,Anniversary Pack,Metal Raiders,Retro Pack,Booster Pack Collectors Tins 2002,Metal Raiders,Starter Deck: Yugi,Metal Raiders,",
                                    "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/70781055.jpg",
                                    "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/70781055.jpg"
                                },
                                {
                                    "id": "71107816",
                                    "name": "The Bistro Butcher",
                                    "type": "Effect Monster",
                                    "desc": "When this card inflicts Battle Damage to your opponent's Life Points, your opponent draws 2 cards from their Deck.",
                                    "atk": "1800",
                                    "def": "1000",
                                    "level": "4",
                                    "race": "Fiend",
                                    "attribute": "DARK",
                                    "set_tag": "DB2-EN063,MRD-108,MRD-E108,MRD-EN108,",
                                    "setcode": "Dark Beginning 2,Metal Raiders,Metal Raiders,Metal Raiders,",
                                    "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/71107816.jpg",
                                    "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/71107816.jpg"
                                },
                                {
                                    "id": "76446915",
                                    "name": "Disk Magician",
                                    "type": "Normal Monster",
                                    "desc": "This monster hides in a saucer and only appears when executing an attack.",
                                    "atk": "1350",
                                    "def": "1000",
                                    "level": "4",
                                    "race": "Machine",
                                    "attribute": "DARK",
                                    "set_tag": "MRD-053,MRD-E053,MRD-EN053,",
                                    "setcode": "Metal Raiders,Metal Raiders,Metal Raiders,",
                                    "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/76446915.jpg",
                                    "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/76446915.jpg"
                                },
                                {
                                    "id": "78010363",
                                    "name": "Witch of the Black Forest",
                                    "type": "Effect Monster",
                                    "desc": "If this card is sent from the field to the GY: Add 1 monster with 1500 or less DEF from your Deck to your hand, but you cannot activate cards, or the effects of cards, with that name for the rest of this turn. You can only use this effect of \"Witch of the Black Forest\" once per turn.",
                                    "atk": "1100",
                                    "def": "1200",
                                    "level": "4",
                                    "race": "Spellcaster",
                                    "attribute": "DARK",
                                    "set_tag": "SDP-014,BP01-EN001,BLLR-EN046,SKE-020,MRD-116,BP01-EN001,DB2-EN066,MRD-E116,MRD-EN116,",
                                    "setcode": "Starter Deck: Pegasus,Battle Pack: Epic Dawn,Battles of Legend: Light's Revenge,Starter Deck: Kaiba Evolution,Metal Raiders,Battle Pack: Epic Dawn,Dark Beginning 2,Metal Raiders,Metal Raiders,",
                                    "ban_goat": "Banned",
                                    "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/78010363.jpg",
                                    "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/78010363.jpg"
                                },
                                {
                                    "id": "80741828",
                                    "name": "Witch's Apprentice",
                                    "type": "Effect Monster",
                                    "desc": "As long as this card remains face-up on the field, increase the ATK of all DARK monsters by 500 points and decrease the ATK of all LIGHT monsters by 400 points.",
                                    "atk": "550",
                                    "def": "500",
                                    "level": "2",
                                    "race": "Spellcaster",
                                    "attribute": "DARK",
                                    "set_tag": "DB2-EN070,MRD-121,MRD-E121,MRD-EN121,",
                                    "setcode": "Dark Beginning 2,Metal Raiders,Metal Raiders,Metal Raiders,",
                                    "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/80741828.jpg",
                                    "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/80741828.jpg"
                                },
                                {
                                    "id": "81480461",
                                    "name": "Barrel Dragon",
                                    "type": "Effect Monster",
                                    "desc": "Once per turn: You can target 1 monster your opponent controls; toss a coin 3 times and destroy it if at least 2 of the results are Heads.",
                                    "atk": "2600",
                                    "def": "2200",
                                    "level": "7",
                                    "race": "Machine",
                                    "attribute": "DARK",
                                    "set_tag": "LED2-EN019,DPBC-EN041,LCJW-EN177,DLG1-EN045,DT02-EN005,MC1-EN002,MRD-126,DB2-EN072,RP01-EN044,MRD-E126,DL1-E002,MRD-EN126,",
                                    "setcode": "Legendary Duelists: Ancient Millennium,Duelist Pack: Battle City,Legendary Collection 4: Joey's World Mega Pack,Dark Legends,Duel Terminal 2,Master Collection Volume 1,Metal Raiders,Dark Beginning 2,Retro Pack,Metal Raiders,Duelist League Series 1 participation cards,Metal Raiders,",
                                    "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/81480461.jpg",
                                    "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/81480461.jpg"
                                },
                                {
                                    "id": "87564352",
                                    "name": "Blackland Fire Dragon",
                                    "type": "Normal Monster",
                                    "desc": "A dragon that dwells in the depths of darkness, its vulnerability lies in its poor eyesight.",
                                    "atk": "1500",
                                    "def": "800",
                                    "level": "4",
                                    "race": "Dragon",
                                    "attribute": "DARK",
                                    "set_tag": "AP05-EN014,DB2-EN036,MRD-062,MRD-E062,MRD-EN062,",
                                    "setcode": "Astral Pack Five,Dark Beginning 2,Metal Raiders,Metal Raiders,Metal Raiders,",
                                    "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/87564352.jpg",
                                    "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/87564352.jpg"
                                },
                                {
                                    "id": "93889755",
                                    "name": "Crass Clown",
                                    "type": "Effect Monster",
                                    "desc": "When this card is changed from Defense Position to Attack Position, return 1 monster on your opponent's side of the field to the owner's hand.",
                                    "atk": "1350",
                                    "def": "1400",
                                    "level": "4",
                                    "race": "Fiend",
                                    "attribute": "DARK",
                                    "set_tag": "DB2-EN050,MRD-078,MRD-EN078,MRD-E078,",
                                    "setcode": "Dark Beginning 2,Metal Raiders,Metal Raiders,Metal Raiders,",
                                    "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/93889755.jpg",
                                    "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/93889755.jpg"
                                },
                                {
                                    "id": "98049915",
                                    "name": "Mystic Lamp",
                                    "type": "Effect Monster",
                                    "desc": "This monster can attack your opponent's Life Points directly.",
                                    "atk": "400",
                                    "def": "300",
                                    "level": "1",
                                    "race": "Spellcaster",
                                    "attribute": "DARK",
                                    "set_tag": "DB1-EN160,MRD-028,MRD-E028,MRD-EN028,",
                                    "setcode": "Dark Beginning 1,Metal Raiders,Metal Raiders,Metal Raiders,",
                                    "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/98049915.jpg",
                                    "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/98049915.jpg"
                                },
                                {
                                    "id": "99551425",
                                    "name": "Labyrinth Tank",
                                    "type": "Fusion Monster",
                                    "desc": "\"Giga-Tech Wolf\" + \"Cannon Soldier\"",
                                    "atk": "2400",
                                    "def": "2400",
                                    "level": "7",
                                    "race": "Machine",
                                    "attribute": "DARK",
                                    "set_tag": "LCJW-EN230,MRD-091,MRD-E091,MRD-EN091,",
                                    "setcode": "Legendary Collection 4: Joey's World Mega Pack,Metal Raiders,Metal Raiders,Metal Raiders,",
                                    "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/99551425.jpg",
                                    "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/99551425.jpg"
                                },
                                {
                                    "id": "81480460",
                                    "name": "Barrel Dragon",
                                    "type": "Effect Monster",
                                    "desc": "Once per turn: You can target 1 monster your opponent controls; toss a coin 3 times and destroy it if at least 2 of the results are Heads.",
                                    "atk": "2600",
                                    "def": "2200",
                                    "level": "7",
                                    "race": "Machine",
                                    "attribute": "DARK",
                                    "set_tag": "LED2-EN019,DPBC-EN041,LCJW-EN177,DLG1-EN045,DT02-EN005,MC1-EN002,MRD-126,DB2-EN072,RP01-EN044,MRD-E126,DL1-E002,MRD-EN126,",
                                    "setcode": "Legendary Duelists: Ancient Millennium,Duelist Pack: Battle City,Legendary Collection 4: Joey's World Mega Pack,Dark Legends,Duel Terminal 2,Master Collection Volume 1,Metal Raiders,Dark Beginning 2,Retro Pack,Metal Raiders,Duelist League Series 1 participation cards,Metal Raiders,",
                                    "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/81480460.jpg",
                                    "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/81480460.jpg"
                                }
                            ],
                            lifepoint: 2000,
                            cardsInHand: [],
                            cardsInField: [],
                            isTurn: false,
                            mainPhase: false,
                            battlePhase: false,
                            endPhase: false,
                            choosenAttack: 0,
                            opponentChoosenAttack: 0
                        },
                        {
                            name:'',
                            deck:[
                                {
                                    "id": "73659078",
                                    "name": "Snowdust Giant",
                                    "type": "XYZ Monster",
                                    "desc": "2 Level 4 WATER monsters\nOnce per turn: You can detach 1 Xyz Material from this card; reveal any number of WATER monsters from your hand, and place that many Ice Counters on face-up monsters on the field. Non-WATER monsters on the field lose 200 ATK for each Ice Counter on the field.",
                                    "atk": "2200",
                                    "def": "800",
                                    "level": "4",
                                    "race": "Beast-Warrior",
                                    "attribute": "WATER",
                                    "set_tag": "ABYR-EN049,",
                                    "setcode": "Abyss Rising,",
                                    "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/73659078.jpg",
                                    "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/73659078.jpg"
                                },
                                {
                                    "id": "4848423",
                                    "name": "Muscle Medic",
                                    "type": "Effect Monster",
                                    "desc": "If a player would take damage from a battle involving this card, they gain that much LP, instead.",
                                    "atk": "2200",
                                    "def": "100",
                                    "level": "4",
                                    "race": "Warrior",
                                    "attribute": "WATER",
                                    "linkval": "0",
                                    "set_tag": "CIBR-EN041,MP18-EN130,",
                                    "setcode": "Circuit Break,2018 Mega-Tin Mega Pack,",
                                    "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/4848423.jpg",
                                    "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/4848423.jpg"
                                },
                                {
                                    "id": "8387138",
                                    "name": "Number 27: Dreadnought Dreadnoid",
                                    "type": "XYZ Monster",
                                    "desc": "2+ Level 4 monsters\r\nAt the end of the Battle Phase, if this card destroyed an opponent's monster by battle: You can Special Summon from your Extra Deck, 1 Rank 10 or higher Machine Xyz Monster by using this face-up card you control as material. (This is treated as an Xyz Summon. Transfer its materials to the Summoned monster.) You can only use this effect of \"Number 27: Dreadnought Dreadnoid\" once per turn. If this face-up card on the field would be destroyed by battle or card effect, you can detach 1 material from this card instead.",
                                    "atk": "2200",
                                    "def": "1000",
                                    "level": "4",
                                    "race": "Machine",
                                    "attribute": "WATER",
                                    "linkval": "0",
                                    "set_tag": "BLRR-EN030,",
                                    "setcode": "Battles of Legend: Relentless Revenge,",
                                    "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/8387138.jpg",
                                    "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/8387138.jpg"
                                },
                                {
                                    "id": "30334522",
                                    "name": "Gishki Psychelone",
                                    "type": "Ritual Effect Monster",
                                    "desc": "You can Ritual Summon this card with any \"Gishki\" Ritual Spell Card. Once per turn: You can declare 1 Monster Type and Attribute; look at 1 random card in your opponent's hand, and if it is a monster of the declared Type and Attribute, shuffle it into the Deck. Otherwise, return it to the hand.",
                                    "atk": "2150",
                                    "def": "1650",
                                    "level": "4",
                                    "race": "Fiend",
                                    "attribute": "WATER",
                                    "archetype": "Gishki",
                                    "set_tag": "DT07-EN080,HA07-EN056,",
                                    "setcode": "Duel Terminal 7b,Hidden Arsenal 7: Knight of Stars,",
                                    "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/30334522.jpg",
                                    "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/30334522.jpg"
                                },
                                {
                                    "id": "25853045",
                                    "name": "Full Armored Black Ray Lancer",
                                    "type": "XYZ Monster",
                                    "desc": "3 Level 4 WATER monsters\r\nYou can also Xyz Summon this card by using a Rank 3 WATER Xyz Monster you control that has no Xyz Materials as the Xyz Material. This card gains 200 ATK for each Xyz Material attached to it. If this face-up card would be destroyed, you can detach all of its Xyz Materials instead. If this card destroys an opponent's monster by battle: You can target 1 Spell/Trap Card your opponent controls; destroy that target.",
                                    "atk": "2100",
                                    "def": "600",
                                    "level": "4",
                                    "race": "Beast-Warrior",
                                    "attribute": "WATER",
                                    "set_tag": "DUSA-EN008,",
                                    "setcode": "Duelist Saga,",
                                    "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/25853045.jpg",
                                    "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/25853045.jpg"
                                },
                                {
                                    "id": "48739166",
                                    "name": "Number 101: Silent Honor ARK",
                                    "type": "XYZ Monster",
                                    "desc": "2 Level 4 monsters\nYou can detach 2 Xyz Materials from this card, then target 1 Special Summoned monster your opponent controls in face-up Attack Position; attach it to this card as a face-up Xyz Material. You can only use this effect of \"Number 101: Silent Honor ARK\" once per turn. If this face-up card would be destroyed, you can detach 1 Xyz Material from this card instead.",
                                    "atk": "2100",
                                    "def": "1000",
                                    "level": "4",
                                    "race": "Aqua",
                                    "attribute": "WATER",
                                    "set_tag": "WIRA-EN047,MP14-EN219,LVAL-EN047,PGL2-EN046,LVAL-EN047,",
                                    "setcode": "Wing Raiders,2014 Mega-Tin Mega Pack,Legacy of the Valiant,Premium Gold: Return of the Bling,Legacy of the Valiant,",
                                    "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/48739166.jpg",
                                    "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/48739166.jpg"
                                },
                                {
                                    "id": "76372778",
                                    "name": "Evigishki Merrowgeist",
                                    "type": "XYZ Monster",
                                    "desc": "2 Level 4 monsters\n After damage calculation, if this card destroys an opponent's monster by battle: You can detach 1 Xyz Material from this card; shuffle the destroyed monster into the Deck instead of sending it to the Graveyard.",
                                    "atk": "2100",
                                    "def": "1600",
                                    "level": "4",
                                    "race": "Aqua",
                                    "attribute": "WATER",
                                    "archetype": "Gishki",
                                    "set_tag": "HA06-EN053,BP03-EN121,DT06-EN089,",
                                    "setcode": "Hidden Arsenal 6: Omega Xyz,Battle Pack 3: Monster League,Duel Terminal 6b,",
                                    "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/76372778.jpg",
                                    "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/76372778.jpg"
                                },
                                {
                                    "id": "17412721",
                                    "name": "Elder Entity Norden",
                                    "type": "Fusion Monster",
                                    "desc": "1 Synchro or Xyz Monster + 1 Synchro or Xyz Monster\nWhen this card is Special Summoned: You can target 1 Level 4 or lower monster in your Graveyard; Special Summon it, but its effects are negated, also banish it when this card leaves the field.",
                                    "atk": "2000",
                                    "def": "2200",
                                    "level": "4",
                                    "race": "Fairy",
                                    "attribute": "WATER",
                                    "set_tag": "CT12-EN003,",
                                    "setcode": "2015 Mega-Tins,",
                                    "ban_tcg": "Banned",
                                    "ban_ocg": "Banned",
                                    "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/17412721.jpg",
                                    "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/17412721.jpg"
                                },
                                {
                                    "id": "86848580",
                                    "name": "Ice Beast Zerofyne",
                                    "type": "XYZ Monster",
                                    "desc": "2 Level 4 Winged Beast-Type monsters\nOnce per turn: You can detach 1 Xyz Material from this card; negate the effects of all face-up cards your opponent currently controls, and if you do, this card gains 300 ATK for each face-up card currently on the field, except this card (these effects are applied until your next Standby Phase).",
                                    "atk": "2000",
                                    "def": "2200",
                                    "level": "4",
                                    "race": "Winged Beast",
                                    "attribute": "WATER",
                                    "set_tag": "LTGY-EN049,",
                                    "setcode": "Lord of the Tachyon Galaxy,",
                                    "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/86848580.jpg",
                                    "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/86848580.jpg"
                                },
                                {
                                    "id": "81823360",
                                    "name": "Megalosmasher X",
                                    "type": "Normal Monster",
                                    "desc": "With its sound-baffling armor and gargantuan jaws, this primeval predator's phosphorescence was the only possible pardon for its primitive prey.",
                                    "atk": "2000",
                                    "def": "0",
                                    "level": "4",
                                    "race": "Dinosaur",
                                    "attribute": "WATER",
                                    "set_tag": "SR04-EN003,",
                                    "setcode": "Dinosmasher's Fury Structure Deck,",
                                    "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/81823360.jpg",
                                    "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/81823360.jpg"
                                },
                                {
                                    "id": "4611269",
                                    "name": "Lion Alligator",
                                    "type": "Effect Monster",
                                    "desc": "While you control a Reptile-Type monster (other than this card), if a Reptile-Type monster you control attacks a Defense Position monster, inflict piercing battle damage to your opponent.",
                                    "atk": "1900",
                                    "def": "200",
                                    "level": "4",
                                    "race": "Reptile",
                                    "attribute": "WATER",
                                    "archetype": "Alligator",
                                    "set_tag": "BP03-EN089,BP03-EN089,LC02-EN008,",
                                    "setcode": "Battle Pack 3: Monster League,Battle Pack 3: Monster League,Legendary Collection 2: The Duel Academy Years,",
                                    "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/4611269.jpg",
                                    "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/4611269.jpg"
                                }
                            ],
                            lifepoint: 2000,
                            cardsInHand: [],
                            cardsInField: [],
                            isTurn: false,
                            mainPhase: false,
                            battlePhase: false,
                            endPhase: false,
                            choosenAttack: 0,
                            opponentChoosenAttack: 0
                        }
                    ],
                    playerState:{
                        name:'',
                        deck:[],
                        lifepoint: 2000,
                        cardsInHand: [],
                        cardsInField: [],
                        isTurn: false,
                        mainPhase: false,
                        battlePhase: false,
                        choosenAttack: 0,
                        opponentChoosenAttack: 0,
                        choosenIndex: 0,
                        opponentChoosenIndex: 0
                    },
                    opponentState: {
                        name:'',
                        deck:[],
                        lifepoint: 2000,
                        cardsInHand: [],
                        cardsInField: [],
                        isTurn: false,
                        mainPhase: false,
                        battlePhase: false,
                        choosenAttack: 0,
                        opponentChoosenAttack: 0,
                        choosenIndex: 0,
                        opponentChoosenIndex: 0
                    }
            }
        }
    },
    methods: {
        fetchCards() {
            // deck
            // .get('/cardinfo.php?set=metal%20raiders&attribute=dark')
            // .then(({data}) => {
            //     data.forEach(payload => {
            //         payload.forEach(card => {
            //             if( card.hasOwnProperty('atk') && this.rooms[0].players[0].deck.length < 20 ) {
            //                 this.rooms[0].players[0].deck.push({card})
            //             }
            //         })

            //     })
            // })
            // .catch(err => {
            //     console.log('err', err);
            // })

            // deck
            // .get('/cardinfo.php?level=4&attribute=water&sort=atk')
            // .then(({data}) => {
            //     data.forEach(payload => {
            //         payload.forEach((data) => {
            //             if( data.hasOwnProperty('atk') && this.rooms[0].players[1].deck.length < 20 ) {
            //                 this.rooms[0].players[1].deck.push(data)
            //             }
            //         })

            //     })
            // })
            // .catch(err => {
            //     console.log('err', err);
            // })


            this.rooms.playerState.deck = this.rooms.players[0].deck
            this.rooms.opponentState.deck = this.rooms.players[1].deck
        },
        draw() {
            while(this.rooms.playerState.cardsInHand.length < 3) {
                this.rooms.playerState.cardsInHand.push(this.rooms.playerState.deck[0]);

                this.rooms.playerState.deck.splice(0,1);
            }
        },
        shuffle(arra1) {
            var ctr = arra1.length, temp, index;

            while (ctr > 0) {
                index = Math.floor(Math.random() * ctr);
                ctr--;
                temp = arra1[ctr];
                arra1[ctr] = arra1[index];
                arra1[index] = temp;
            }

            return arra1;
        },
        clickCard(id) {
            if(this.rooms.playerState.mainPhase) {
                this.rooms.playerState.cardsInHand = this.rooms.playerState.cardsInHand.filter(card => {
                    if(card.id !== id) {
                        return card
                    }else {
                        this.rooms.playerState.cardsInField.push(card)
                    }
                })
                this.rooms.playerState.mainPhase = false
                this.rooms.playerState.battlePhase = true
            }
        },
        endPhase() {
            this.rooms.playerState.mainPhase = false
            this.rooms.playerState.battlePhase = false
            this.rooms.playerState.isTurn = false
            this.rooms.opponentState.isTurn = true
        },
        battleMyCard(index, atk) {
            this.rooms.playerState.choosenAttack = atk
            this.rooms.playerState.choosenIndex = index
        },
        battleOpponentCard(index, atk) {
            this.rooms.opponentState.choosenAttack = atk
            this.rooms.opponentState.choosenIndex = index
        },
        battle() {
            if(this.rooms.playerState.battlePhase) {
                let damage = 0
    
                this.rooms.playerState.choosenAttack = attackPoint

                if(this.rooms.playerState.choosenAttack > 0 && this.rooms[0].playerState.opponentChoosenAttack > 0) {
                    if(this.rooms.playerState.choosenAttack > this.rooms.playerState.opponentChoosenAttack) {
                        damage=this.rooms.playerState.choosenAttack - this.rooms.playerState.opponentChoosenAttack
    
                        this.rooms.opponentState.lifepoint-=damage
                        this.rooms.opponentState.cardsInField.splice(this.rooms.opponentState.choosenIndex, 1)
                    }else if(this.rooms.playerState.choosenAttack < this.rooms.playerState.opponentChoosenAttack){
                        damage=this.rooms.playerState.opponentChoosenAttack - this.rooms.playerState.choosenAttack
    
                        this.rooms.playerState.lifepoint-=damage
                        this.rooms.playerState.cardsInField.splice(this.rooms.playerState.choosenIndex, 1)
                    }else {
                        this.rooms.playerState.cardsInField.splice(this.rooms.playerState.choosenIndex, 1)
                        this.rooms.opponentState.cardsInField.splice(this.rooms.opponentState.choosenIndex, 1)
                    }
                }

                this.rooms.playerState.battlePhase=false
                this.rooms.playerState.isTurn=false
                this.rooms.opponentState.isTurn=true

                this.rooms.playerState.choosenAttack = 0
                this.rooms.playerState.choosenIndex = 0
                this.rooms.opponentState.choosenAttack = 0
                this.rooms.opponentState.choosenIndex = 0
            }
        },
        init() {
            this.rooms.playerState.mainPhase = true
            this.rooms.opponentState.mainPhase = false
            this.fetchCards()
            this.shuffle(this.rooms.playerState.deck)
            this.shuffle(this.rooms.opponentState.deck)
        },
        battle(index, attackPoint, opponentAttackPoint) {
            if(this.rooms.playerState.battlePhase) {
                let damage = 0
    
                this.rooms.playerState.choosenAttack = attackPoint

                if(this.rooms.playerState.choosenAttack > 0 && this.rooms[0].playerState.opponentChoosenAttack > 0) {
                    if(this.rooms.playerState.choosenAttack > this.rooms.playerState.opponentChoosenAttack) {
                        damage=this.rooms.playerState.choosenAttack - this.rooms.playerState.opponentChoosenAttack
    
                        this.rooms.opponentState.lifepoint-=damage
                        this.rooms.opponentState.cardsInField.splice(index, 1)
                    }else if(this.rooms.playerState.choosenAttack < this.rooms.playerState.opponentChoosenAttack){
                        damage=this.rooms.playerState.opponentChoosenAttack - this.rooms.playerState.choosenAttack
    
                        this.rooms.playerState.lifepoint-=damage
                        this.rooms.playerState.cardsInField.splice(index, 1)
                    }else {
                        this.rooms.playerState.cardsInField.splice(index, 1)
                        this.rooms.opponentState.cardsInField.splice(index, 1)
                    }
                }

                this.rooms.playerState.battlePhase=false
                this.rooms.playerState.isTurn=false
                this.rooms.opponentState.isTurn=true
            }
        },
        init() {
            this.rooms.playerState.mainPhase = true
            this.rooms.opponentState.mainPhase = false
            this.fetchCards()
            this.shuffle(this.rooms.playerState.deck)
            this.shuffle(this.rooms.opponentState.deck)
            this.draw()
            // while(this.rooms[0].players[0].lifepoint > 0 && this.rooms[0].players[1].lifepoint > 1) {
            // }

        }
    },
    mounted() {
        this.init()
    },
    created() {
    },
    watch: {
        'rooms':function (newVal, oldVal){
     },
    },
}
</script>

<style scope>
.card-container {
    display: flex;
    justify-content: space-evenly;
    width: 830px;
    margin: 0 auto;
}
.card {
    margin: 12px auto 0px;
}
.card-field {
    position: relative;

    border: solid 2px #6c9ab7;
    border-radius: 5px;
    width: 170px;
    height: 240px;

    margin: 5px 0px;
}
.cursor-pointer {
    cursor: pointer;
}
.player-status {
    font-family: 'Prosto One', cursive;

    position: fixed;
    text-align: left;
    bottom: 35px;
    background: #fff;
    left: 19px;
    padding: 2px 12px;
    opacity: 0.8;
}
.player-status > .name {
    font-size: 37px;
}
.player-status > .lifepoint {
    font-size: 30px;
}

.actions {
    position: fixed;
    right: 1px;
    bottom: 35px;
}

.actions li {
    list-style: none;
    text-align: right;
}

.opponent-status {
    font-family: 'Prosto One', cursive;

    position: fixed;
    text-align: left;
    top: 35px;
    right: 1px;
    background: #fff;

    padding: 2px 12px;
    opacity: 0.8;
}
.opponent-status > .name {
    font-size: 37px;
}
.opponent-status > .lifepoint {
    font-size: 30px;
}
.relative {
    position: relative;
}
.card__tooltip {
    position: absolute;
    background-color: #000;
    opacity: 0.8;
    border-radius: 7px;
    color: #fff;
    font-weight: 500;
    right: -69px;
    top: -90px;
    
    display: none;
}
.card__tooltip .name {
    font-weight: 700;
    padding: 10px 14px;
    width: 320px;
    left: -78px;
    top: -178px;
}
.relative:hover .card__tooltip {
    display: block;
}
.battle-phase {
    font-family: 'Prosto One', cursive;
    background-color: #6c8ddd;
    position: fixed;
    width: 207px;
    top: 35px;
    left: 26px;
    color: #fff;
    font-size: 21px;
    padding: 16px;
    border-radius: 5px;
    opacity: 0.9;
}
.ingame-bg {
    background-image: url('https://cdn-www.bluestacks.com/bs-images/yu-gi-oh_banner.jpg');
    background-size: contain;
    min-height: 626px;
}
.battlefield {
    min-width: 930px;
    background-color: #2c5459;
    min-height: 100vh;
    position: absolute;
    top: 5px;
    left: 201px;
    border: solid 1px #bdbdbd;
    border-radius: 8px;
    opacity: 0.5;
}
.actions {
    font-family: 'Prosto One', cursive;
    background-color: #fff;

    padding: 2px 12px;
    opacity: 0.8;
}
</style>
