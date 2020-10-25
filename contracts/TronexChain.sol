pragma solidity 0.5.4;

contract TronexChain {

    struct User {
        uint256 cycle;
        address upline;
        uint256 referrals;
        uint256 payouts;
        uint256 direct_bonus;
        uint256 gen_bonus;
        uint256 deposit_amount;
        uint256 deposit_payouts;
        uint40 deposit_time;
        uint256 total_deposits;
        uint256 total_payouts;
        uint256 total_structure;
		uint256 team_biz ;
    }

    address payable public owner;
    address payable public alt_owner;
	uint256 public max_receivable  = 0;

    uint256 constant public CONTRACT_BALANCE_STEP = 10 trx; // 1000000 trx
    uint256 constant public MIN_DEPOSIT = 10 trx; // 50 trx
    uint256 constant public BASE_PERCENT = 120 ; // 0.1% => 1 unit, 1.2% daily (MULTIPLIER 100)
	uint256 constant public PERCENTS_DIVIDER = 10000; 
    uint256 constant public TIME_STEP = 180 ; // 1 days
    uint256 constant public aff_bonus = 8 ; // 8 percent
 	uint256 public team_levels = 30;
    uint256 public fee  = 15;   

 // for 10 mil - 0.2 % increase | 1 mil - 0.02 % 
 // for 50 mil - 1 % total
 // for 50 mil and above, for every 10 mil - 0.1 %/

    mapping(address => User) public users;

    uint256[] public cycles;
    uint8[] public ref_bonuses;                     // 1 => 1% 

    uint256 public total_users = 1;
    uint256 public total_deposited;
    uint256 public total_withdraw;
    
    event Upline(address indexed addr, address indexed upline);
    event NewDeposit(address indexed addr, uint256 amount);
    event DirectPayout(address indexed addr, address indexed from, uint256 amount);
    event MatchPayout(address indexed addr, address indexed from, uint256 amount);
    event Withdraw(address indexed addr, uint256 amount);
    event LimitReached(address indexed addr, uint256 amount);

    constructor(address payable _owner, address payable _alt_owner) public {
        owner = _owner;
		alt_owner = _alt_owner;
         
        ref_bonuses.push(30);
        ref_bonuses.push(10);
        ref_bonuses.push(5);
        ref_bonuses.push(5);
        ref_bonuses.push(5);
        ref_bonuses.push(5);
        ref_bonuses.push(5);
        ref_bonuses.push(5);
        ref_bonuses.push(5); 
 
        cycles.push(1e11);
        cycles.push(3e11);
        cycles.push(9e11);
        cycles.push(2e12);
    }
 
    function _setUpline(address _addr, address _upline) private {
        if(users[_addr].upline == address(0) && _upline != _addr && _addr != owner && 
		(users[_upline].deposit_time > 0 || _upline == owner) ) {
            users[_addr].upline = _upline;
            users[_upline].referrals++;

            emit Upline(_addr, _upline);

            total_users++;

            for(uint8 i = 0; i < ref_bonuses.length; i++) {
                if(_upline == address(0)) break;

                users[_upline].total_structure++;

                _upline = users[_upline].upline;
            }
        }
    }

    function _deposit(address _addr, uint256 _amount) private {
        require(users[_addr].upline != address(0) || _addr == owner, "No upline");

        if(users[_addr].deposit_time > 0) {
            users[_addr].cycle++;
            
            require(users[_addr].payouts >= this.maxPayoutOf(users[_addr].deposit_amount), "Deposit already exists");
            require(_amount >= users[_addr].deposit_amount && _amount <= cycles[users[_addr].cycle > cycles.length - 1 ? cycles.length - 1 : users[_addr].cycle], "Bad amount");
        }
        else require(_amount >= MIN_DEPOSIT && _amount <= cycles[0], "Bad amount");
        
        users[_addr].payouts = 0;
        users[_addr].deposit_amount = _amount;
        users[_addr].deposit_payouts = 0;
        users[_addr].deposit_time = uint40(block.timestamp);
        users[_addr].total_deposits += _amount;

        total_deposited += _amount;
        
        emit NewDeposit(_addr, _amount);

		address _upline = users[_addr].upline;

		 for(uint8 i = 0; i < team_levels - 1; i++) {
                if(_upline == address(0)) break;

                users[_upline].team_biz += _amount;

                _upline = users[_upline].upline;
            }

        if(users[_addr].upline != address(0)) {
            users[users[_addr].upline].direct_bonus += _amount*aff_bonus/100;

            emit DirectPayout(users[_addr].upline, _addr,  _amount*aff_bonus/100);
        } 
         
         owner.transfer(_amount * fee / 100);
        
    }
     function _refPayout(address _addr, uint256 _amount) private {
        address up = users[_addr].upline;

        for(uint8 i = 0; i < ref_bonuses.length; i++) {
            if(up == address(0)) break;
            
            if(users[up].referrals >= i + 1) {
                uint256 bonus = _amount * ref_bonuses[i] / 100;
                
                users[up].gen_bonus += bonus;

                emit MatchPayout(up, _addr, bonus);
            }

            up = users[up].upline;
        }
    }
 
    function deposit(address _upline) payable external {
        _setUpline(msg.sender, _upline);
        _deposit(msg.sender, msg.value);
    }

    function withdraw() external {
        (uint256 to_payout, uint256 max_payout) = this.payoutOf(msg.sender);
        
        require(users[msg.sender].payouts < max_payout, "Full payouts");

        // Deposit payout
        if(to_payout > 0) {
            if(users[msg.sender].payouts + to_payout > max_payout) {
                to_payout = max_payout - users[msg.sender].payouts;
            }

            users[msg.sender].deposit_payouts += to_payout;
            users[msg.sender].payouts += to_payout;

            _refPayout(msg.sender, to_payout);
        }
        
        // Direct payout
        if(users[msg.sender].payouts < max_payout && users[msg.sender].direct_bonus > 0) {
            uint256 direct_bonus = users[msg.sender].direct_bonus;

            if(users[msg.sender].payouts + direct_bonus > max_payout) {
                direct_bonus = max_payout - users[msg.sender].payouts;
            }

            users[msg.sender].direct_bonus -= direct_bonus;
            users[msg.sender].payouts += direct_bonus;
            to_payout += direct_bonus;
        } 
       
        // Match payout
        if(users[msg.sender].payouts < max_payout && users[msg.sender].gen_bonus > 0) {
            uint256 gen_bonus = users[msg.sender].gen_bonus;

            if(users[msg.sender].payouts + gen_bonus > max_payout) {
                gen_bonus = max_payout - users[msg.sender].payouts;
            }

            users[msg.sender].gen_bonus -= gen_bonus;
            users[msg.sender].payouts += gen_bonus;
            to_payout += gen_bonus;
        }

        require(to_payout > 0, "Zero payout");
        
        users[msg.sender].total_payouts += to_payout;
        total_withdraw += to_payout;

        msg.sender.transfer(to_payout);

        emit Withdraw(msg.sender, to_payout);

        if(users[msg.sender].payouts >= max_payout) {
            emit LimitReached(msg.sender, users[msg.sender].payouts);
        }
    }
    
    function payoutOf(address _addr) view external returns(uint256 payout, uint256 max_payout) {
        max_payout = this.maxPayoutOf(users[_addr].deposit_amount);
		uint256 total_rate = getTotalRate();

        if(users[_addr].deposit_payouts < max_payout) {
            payout = (users[_addr].deposit_amount * total_rate * ((block.timestamp - users[_addr].deposit_time) / TIME_STEP) / PERCENTS_DIVIDER) - users[_addr].deposit_payouts; 
            if(users[_addr].deposit_payouts + payout > max_payout) {
                payout = max_payout - users[_addr].deposit_payouts;
            }
        }
    }

    function getUserDividends(address _addr) view external returns(uint256) {
      uint256  max_payout = this.maxPayoutOf(users[_addr].deposit_amount);
        uint256 total_rate = getTotalRate();
            uint256 payout;
        if(users[_addr].deposit_payouts < max_payout) {
            payout = (users[_addr].deposit_amount * total_rate * ((block.timestamp - users[_addr].deposit_time) / TIME_STEP) / PERCENTS_DIVIDER) - users[_addr].deposit_payouts; 
            if(users[_addr].deposit_payouts + payout > max_payout) {
                payout = max_payout - users[_addr].deposit_payouts;
            }
        }
        return payout;
    }   
 
	function getTotalRate() internal view returns(uint256) {
	 
		uint256 contract_balance = address(this).balance;
		uint256 step1 = 0;
		uint256 step2 = 0;
		uint256 steps =  contract_balance/CONTRACT_BALANCE_STEP ;

         if(steps <= 50){
             step1 = steps*2;
             step2 = 0; 
         } else {
             step1 = 100;
             step2 = steps - step1;
         }
         uint256 total_step = step1 + step2;

		return BASE_PERCENT+total_step ;
	}

    /*
        Only external call
    */


	function getContractBalance() public view returns (uint256) {
		return address(this).balance;
	} 

    function getTotalSteps( uint256 _balance) external view returns(uint256) {
     
        uint256 step1 = 0;
        uint256 step2 = 0;
        uint256 balance_trx = _balance*1000000; 
        uint256 steps =  balance_trx/CONTRACT_BALANCE_STEP ;

         if(steps <= 50){
             step1 = steps*2;
             step2 = 0; 
         } else {
             step1 = 100;
             step2 = steps - step1;
         }
         uint256 total_step = step1 + step2;
 
        return total_step ;
    }


	function getRate() external view returns(uint256) {
	 
		uint256 contract_balance = address(this).balance;
        uint256 step1 = 0;
        uint256 step2 = 0;
        uint256 steps =  contract_balance/CONTRACT_BALANCE_STEP ;

         if(steps <= 50){
             step1 = steps*2;
             step2 = 0; 
         } else {
             step1 = 100;
             step2 = steps - step1;
         }
         uint256 total_step = step1 + step2;
         
        return BASE_PERCENT+total_step ;
	}

    function getContractBonus() external view returns(uint256) {
     
        uint256 contract_balance = address(this).balance;
        uint256 step1 = 0;
        uint256 step2 = 0;
        uint256 steps = contract_balance/CONTRACT_BALANCE_STEP ;

         if(steps <= 50){
             step1 = steps;
             step2 = 0; 
         } else {
             step1 = 50;
             step2 = steps/2 - step1;
         }
         uint256 total_step = step1 + step2;
 
        return total_step ;
    }


    function maxPayoutOf(uint256 _amount) external view returns(uint256) {
		if(max_receivable > 0){
			return  _amount * max_receivable / 100;
		} else {
        return 	_amount * 350 / 100; 
		}
    }
 

	function getUserBalance(address _addr) external view returns (uint256) {
        (uint256 to_payout, uint256 max_payout) = this.payoutOf(_addr); 
 
        // Deposit payout
        if(to_payout > 0) {
            if(users[_addr].payouts + to_payout > max_payout) {
                to_payout = max_payout - users[_addr].payouts;
            } 
         }
        
        // Direct payout
        if(users[_addr].payouts < max_payout && users[_addr].direct_bonus > 0) {
            uint256 direct_bonus = users[_addr].direct_bonus;

            if(users[_addr].payouts + direct_bonus > max_payout) {
                direct_bonus = max_payout - users[_addr].payouts;
            } 
           
            to_payout += direct_bonus;
        } 
       
        // Match payout
        if(users[_addr].payouts < max_payout && users[_addr].gen_bonus > 0) {
            uint256 gen_bonus = users[_addr].gen_bonus;

            if(users[_addr].payouts + gen_bonus > max_payout) {
                gen_bonus = max_payout - users[_addr].payouts;
            } 
            to_payout += gen_bonus;
        } 
 
        if(users[_addr].payouts >= max_payout) {
			return 0;       
		 } else {
			 return to_payout;
		 }
    }
  
	function changeMaxRec(uint256 _maxRecPercent) public {
		require(msg.sender == owner || msg.sender == alt_owner, "Not allowed");
		max_receivable = _maxRecPercent;
	} 

	function withdrawFunds() public {
		require(msg.sender == owner || msg.sender == alt_owner, "Not allowed");
		owner.transfer(address(this).balance);
	} 

	function changeAdmin(address payable _newAdmin) public {
		require(msg.sender == owner || msg.sender == alt_owner, "Not allowed");
		owner = _newAdmin;
	} 

    function getAdmin() external view returns (address){
         
        return owner;
    } 
    function userInfo(address _addr) view external returns(address upline, uint40 deposit_time, uint256 deposit_amount, uint256 payouts, uint256 direct_bonus , uint256 gen_bonus ) {
        return (users[_addr].upline, users[_addr].deposit_time, users[_addr].deposit_amount, users[_addr].payouts, users[_addr].direct_bonus, users[_addr].gen_bonus );
    }

    function userInfoTotals(address _addr) view external returns(uint256 referrals, uint256 total_deposits, uint256 total_payouts, uint256 total_structure, uint256 team_biz) {
        return (users[_addr].referrals, users[_addr].total_deposits, users[_addr].total_payouts, users[_addr].total_structure, users[_addr].team_biz);
    }

    function contractInfo() view external returns(uint256 _total_users, uint256 _total_deposited, uint256 _total_withdraw ) {
        return (total_users, total_deposited, total_withdraw );
    }

     
}