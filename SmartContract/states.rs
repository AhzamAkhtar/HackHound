use anchor_lang::prelude::*;

#[account]
#[derive(Default)]

pub struct UserProfile {
    pub authority : Pubkey,
    pub name : String,
    pub email : String,
}

#[account]
#[derive(Default)]

pub struct RestaurantAccount{
    pub authority : Pubkey,
    pub image_url : String,
    pub restaurant_name : String,
    pub restaurant_tag : String,
    pub rating : String,
    pub index : u8,
    pub item_one : String,
    pub item_one_price : String,
    pub item_one_url : String,
    pub item_second : String,
    pub item_second_price : String,
    pub item_second_url : String,
    pub item_third : String,
    pub item_third_price : String,
    pub item_third_url : String,
    pub item_fourth : String,
    pub item_fourth_price : String,
    pub item_fourth_url : String,
    pub item_fifth : String,
    pub item_fifth_price : String,
    pub item_fifth_url : String,
}

#[account]
#[derive(Default)]

pub struct ItemAccount {
    pub authority : Pubkey,
    pub item_name : String,
    pub price : String,
    pub img : String,
    pub index : u8,
}

