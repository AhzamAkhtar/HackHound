use anchor_lang::prelude::*;
pub mod constant;
pub mod states;

use crate::{constant::*, states::*};
const RESTAURENT_URL_LENGTH: usize = 255;
const RESTAURENT_DESCRIPTION: usize = 255;

const ITEM_URL: usize = 225;
const ITEM_DESCRIPTION: usize = 225;
declare_id!("A4BbAshi7DdK2oq9xxNMijbjwTrj9ig8TZuULL54LGm1");

#[program]

pub mod hackhound {
    use super::*;

    pub fn initialize_user(
        ctx: Context<InitializeUser>,
        name: String,
        email: String,
    ) -> Result<()> {
        let user_profile = &mut ctx.accounts.user_profile;
        user_profile.authority = ctx.accounts.authority.key();
        user_profile.name = name;
        user_profile.email = email;

        Ok(())
    }

    pub fn add_restaurant(
        ctx: Context<AddRestaurant>,
        image_url: String,
        restaurant_name: String,
        restaurant_tag: String,
        rating: String,
        item_one : String,
        item_one_price : String,
        item_one_url : String,
        item_second : String,
        item_second_price : String,
        item_second_url : String,
        item_third : String,
        item_third_price : String,
        item_third_url : String,
        item_fourth : String,
        item_fourth_price : String,
        item_fourth_url : String,
        item_fifth : String,
         item_fifth_price : String,
         item_fifth_url : String,
    ) -> Result<()> {
        let restaurant_account = &mut ctx.accounts.restaurant_account;
        restaurant_account.authority = ctx.accounts.authority.key();
        restaurant_account.image_url = image_url;
        restaurant_account.restaurant_name = restaurant_name;
        restaurant_account.restaurant_tag = restaurant_tag;
        restaurant_account.rating = rating;
        restaurant_account.item_one = item_one;
        restaurant_account.item_one_price = item_one_price;
        restaurant_account.item_one_url = item_one_url;
        restaurant_account.item_second = item_second;
        restaurant_account.item_second_price = item_second_price;
        restaurant_account.item_second_url = item_second_url;
        restaurant_account.item_third = item_third;
        restaurant_account.item_third_price = item_third_price;
        restaurant_account.item_third_url = item_third_url;
        restaurant_account.item_fourth = item_fourth;
        restaurant_account.item_fourth_price = item_fourth_price;
        restaurant_account.item_fourth_url = item_fourth_url;
        restaurant_account.item_fifth = item_fifth;
        restaurant_account.item_fifth_price = item_fifth_price;
        restaurant_account.item_fifth_url = item_fifth_url;
        restaurant_account.index = 0;

        Ok(())
    }

    pub fn add_item(
        ctx: Context<AddItem>,
        item_name: String,
        price: String,
        img: String,
    ) -> Result<()> {
        let restaurent_account = &mut ctx.accounts.restaurent_account;
        let item_account = &mut ctx.accounts.item_account;

        item_account.authority = ctx.accounts.authority.key();
        item_account.item_name = item_name;
        item_account.price = price;
        item_account.img = img;
        item_account.index = restaurent_account.index;

        restaurent_account.index = restaurent_account.index.checked_add(1).unwrap();

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction()]

pub struct InitializeUser<'info> {
    #[account(
        init,
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
        payer = authority,
        space = std::mem::size_of::<UserProfile>() 
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction()]

pub struct AddRestaurant<'info> {
    #[account(
        init,
        seeds = [RESTAURANT_TAG , authority.key().as_ref()],
        bump,
        payer = authority,
        space = std::mem::size_of::<RestaurantAccount>() + RESTAURENT_URL_LENGTH + RESTAURENT_DESCRIPTION + 8
    )]
    pub restaurant_account: Box<Account<'info, RestaurantAccount>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction()]

pub struct AddItem<'info> {
    #[account(
        mut,
        seeds = [RESTAURANT_TAG , authority.key().as_ref()],
        bump,
        has_one = authority,
    )]
    pub restaurent_account: Box<Account<'info, RestaurantAccount>>,

    #[account(
        init,
        seeds = [ITEM_TAG , authority.key().as_ref() , &[restaurent_account.index as u8].as_ref()],
        bump,
        payer = authority,
        space = std::mem::size_of::<ItemAccount>() + ITEM_URL + ITEM_DESCRIPTION + 8
    )]
    pub item_account: Box<Account<'info, ItemAccount>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}
