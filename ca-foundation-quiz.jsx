import { useState, useEffect, useRef } from "react";

/* ── CONFIG ── */
const SUBJECTS = {
  Maths: {
    icon: "📐", color: "#6366f1",
    chapters: ["Ratio & Proportion","Linear Equations","Indices & Logarithm","Time & Work","Time Value of Money","Permutation & Combination","Sequence & Series","Sets, Relations & Functions","Limits & Continuity","Statistics","Probability"]
  },
  Economics: {
    icon: "📊", color: "#0891b2",
    chapters: ["Nature of Economics","Utility Analysis","Demand Analysis","Supply Analysis","Production Concepts","Cost & Revenue Concepts","Forms of Market","Business Cycle","National Income","Money & Banking"]
  }
};

const ADMIN = { name:"admin", pass:"12345", avatar:"🧑‍🏫" };

const STUDENTS = [
  { id:"s1", name:"Rahul Verma",   pass:"stu123", avatar:"🎓" },
  { id:"s2", name:"Priya Shah",    pass:"stu456", avatar:"🎓" },
  { id:"s3", name:"Amit Patel",    pass:"stu789", avatar:"🎓" },
  { id:"s4", name:"Sneha Gupta",   pass:"stu000", avatar:"🎓" },
];

const QUIZ_SECS = 45;

const DEMO_QS = [
  // ── Ratio & Proportion ──
  { id:1,  subject:"Maths", chapter:"Ratio & Proportion",   q:"If A:B = 2:3 and B:C = 4:5, then A:C = ?",                                     opts:["8:15","6:10","4:9","2:5"],                                                                          correct:0, teacher:"Prof. Sharma" },
  { id:2,  subject:"Maths", chapter:"Ratio & Proportion",   q:"In what ratio must tea at ₹60/kg be mixed with tea at ₹80/kg to get ₹70/kg?",  opts:["1:1","2:3","3:2","1:2"],                                                                            correct:0, teacher:"Prof. Sharma" },
  // ── Linear Equations ──
  { id:3,  subject:"Maths", chapter:"Linear Equations",     q:"The solution of 3x + 7 = 22 is:",                                              opts:["x = 4","x = 5","x = 3","x = 6"],                                                                    correct:1, teacher:"Prof. Sharma" },
  // ── Economics ──
  { id:4,  subject:"Economics", chapter:"Demand Analysis",   q:"Which of the following causes a rightward shift of the demand curve?",         opts:["Fall in income","Rise in price of complement","Rise in consumer income","Rise in price of substitute"], correct:2, teacher:"Prof. Mehta" },
  { id:5,  subject:"Economics", chapter:"National Income",   q:"GDP at market price – Net indirect taxes = ?",                                  opts:["NNP at FC","GDP at FC","NNP at MP","GNP at FC"],                                                     correct:1, teacher:"Prof. Mehta" },

  // ══ NATURE OF ECONOMICS — Ch.1 Intro to Micro Economics ══
  { id:100, subject:"Economics", chapter:"Nature of Economics", q:"The meaning of the word 'Economic' is most closely connected with:",                  opts:["Unlimited","Scarce","Extravagant","Restricted"],                                                                   correct:1, teacher:"Prof. Mehta" },
  { id:101, subject:"Economics", chapter:"Nature of Economics", q:"'Ends' refer to:",                                                                    opts:["Human Wants","Resources","Both (a) and (b)","Neither (a) nor (b)"],                                                correct:0, teacher:"Prof. Mehta" },
  { id:102, subject:"Economics", chapter:"Nature of Economics", q:"The Law of Scarcity implies that:",                                                   opts:["Does not apply to rich countries","Applies only to less developed countries","Wants satisfied in socialistic system","Consumer wants will never be completely satisfied"], correct:3, teacher:"Prof. Mehta" },
  { id:103, subject:"Economics", chapter:"Nature of Economics", q:"All means of production owned by private individuals for profit is called:",           opts:["Socialistic economy","Capitalistic economy","Mixed economy","None of the above"],                                  correct:1, teacher:"Prof. Mehta" },
  { id:104, subject:"Economics", chapter:"Nature of Economics", q:"In Economics, Scarcity is an:",                                                       opts:["Absolute Concept","Relative Concept","Irrelevant Concept","Not a Concept at all"],                                 correct:1, teacher:"Prof. Mehta" },
  { id:105, subject:"Economics", chapter:"Nature of Economics", q:"Selecting the best alternative from two or more courses of action is called:",        opts:["Problem solving","Decision making","Economic analysis","Managerial Expertise"],                                    correct:1, teacher:"Prof. Mehta" },
  { id:106, subject:"Economics", chapter:"Nature of Economics", q:"Integration of Economic theory with business practice is called:",                    opts:["Applied Economics","Managerial Economics","Business Economics","All of the above"],                                 correct:3, teacher:"Prof. Mehta" },
  { id:107, subject:"Economics", chapter:"Nature of Economics", q:"Positive Science explains:",                                                          opts:["What was","What is","What ought to be","What will"],                                                               correct:1, teacher:"Prof. Mehta" },
  { id:108, subject:"Economics", chapter:"Nature of Economics", q:"Normative Science explains:",                                                         opts:["What was","What is","What ought to be","What will"],                                                               correct:2, teacher:"Prof. Mehta" },
  { id:109, subject:"Economics", chapter:"Nature of Economics", q:"Micro Economics deals with:",                                                         opts:["Employment","External Value of Money","Savings and Investment","Consumer Behaviour"],                              correct:3, teacher:"Prof. Mehta" },
  { id:110, subject:"Economics", chapter:"Nature of Economics", q:"Study of consumer preferences and changes in determinants of demand is known as:",    opts:["Demand Analysis","Demand Forecasting","Production Analysis","Market Analysis"],                                    correct:0, teacher:"Prof. Mehta" },
  { id:111, subject:"Economics", chapter:"Nature of Economics", q:"Technique of predicting future demand based on past behaviour of factors is:",        opts:["Demand Analysis","Demand Optimization","Demand Forecasting","All of the above"],                                  correct:2, teacher:"Prof. Mehta" },
  // Central Economic Problems
  { id:112, subject:"Economics", chapter:"Nature of Economics", q:"Which is a cause of the economic problem?",                                           opts:["Unlimited Wants","Scarcity of Resources","Alternative Uses","All of the above"],                                  correct:3, teacher:"Prof. Mehta" },
  { id:113, subject:"Economics", chapter:"Nature of Economics", q:"Which of the following is NOT a central problem of an economy?",                      opts:["How to Produce","When to Produce","What to Produce","All of these"],                                              correct:1, teacher:"Prof. Mehta" },
  { id:114, subject:"Economics", chapter:"Nature of Economics", q:"The Central Problems of an economy are:",                                             opts:["How to produce","What to produce","For whom to produce","All of the above"],                                      correct:3, teacher:"Prof. Mehta" },
  { id:115, subject:"Economics", chapter:"Nature of Economics", q:"The problem of 'What to produce' covers the issue relating to:",                      opts:["What goods to produce","Quantities of goods","Both (a) and (b)","Neither (a) nor (b)"],                           correct:2, teacher:"Prof. Mehta" },
  { id:116, subject:"Economics", chapter:"Nature of Economics", q:"Labour Intensive Techniques are preferred in:",                                       opts:["Labour Surplus Economy","Capital Surplus Economy","Developed Economy","Developing Economy"],                       correct:0, teacher:"Prof. Mehta" },
  { id:117, subject:"Economics", chapter:"Nature of Economics", q:"Capitalist Economy is characterized by:",                                             opts:["Private Ownership of Resources","Freedom of Enterprise","Consumer Sovereignty","All of the above"],               correct:3, teacher:"Prof. Mehta" },
  { id:118, subject:"Economics", chapter:"Nature of Economics", q:"The driving force of a Free Market Economy is:",                                      opts:["Profit motive","Welfare of the people","Rising incomes and level of living","All of the above"],                  correct:0, teacher:"Prof. Mehta" },
  { id:119, subject:"Economics", chapter:"Nature of Economics", q:"In Capitalist Economies, answers to what/how/for whom are obtained by:",              opts:["Market Forces of Demand and Supply","Government Regulations","Cost Benefit Analysis","Both (b) and (c)"],        correct:0, teacher:"Prof. Mehta" },
  { id:120, subject:"Economics", chapter:"Nature of Economics", q:"People's freedom to choose what to buy dictates what producers produce. This refers to:", opts:["Economic Power of Choice","Consumer Sovereignty","Positive Economy","Producer Sovereignty"],                  correct:1, teacher:"Prof. Mehta" },
  { id:121, subject:"Economics", chapter:"Nature of Economics", q:"Socialist Economy is characterized by:",                                              opts:["Selective production","Relative Equality of Incomes","Secondary Role of Price Mechanism","All of the above"],     correct:3, teacher:"Prof. Mehta" },
  { id:122, subject:"Economics", chapter:"Nature of Economics", q:"National Income is more evenly distributed in:",                                      opts:["Market Economy","Command Economy","Mixed Economy","All of the above"],                                           correct:1, teacher:"Prof. Mehta" },
  { id:123, subject:"Economics", chapter:"Nature of Economics", q:"In a Socialist Economy, the concept of Consumer Sovereignty is:",                     opts:["Restricted","Unrestricted","Recognised","None of the above"],                                                      correct:0, teacher:"Prof. Mehta" },
  { id:124, subject:"Economics", chapter:"Nature of Economics", q:"The term 'Mixed Economy' denotes:",                                                   opts:["Co-existence of consumer/producer goods industries","Co-existence of private & public sectors","Co-existence of urban & rural sectors","Co-existence of large & small industries"], correct:1, teacher:"Prof. Mehta" },
  { id:125, subject:"Economics", chapter:"Nature of Economics", q:"In a Mixed Economy, fundamental questions are answered by:",                          opts:["Government Regulations","Market Forces of Demand and Supply","Cost Benefit Analysis","All of the above"],        correct:3, teacher:"Prof. Mehta" },
  { id:126, subject:"Economics", chapter:"Nature of Economics", q:"Indian Economy is an example of:",                                                    opts:["Socialist Economy","Capitalist Economy","Mixed Economy","All of the above"],                                      correct:2, teacher:"Prof. Mehta" },
  { id:127, subject:"Economics", chapter:"Nature of Economics", q:"In India, areas like Atomic Energy and Defence are in the hands of:",                 opts:["Public Sector","Private Sector","Joint Sector","None of the above"],                                              correct:0, teacher:"Prof. Mehta" },

  // ══ UTILITY ANALYSIS — Ch.2 ══
  { id:130, subject:"Economics", chapter:"Utility Analysis", q:"Utility of a product refers to:",                                                        opts:["Usefulness in consumption","Demand for the product","Satisfaction gained from consuming","Rate of exchanging one good for another"], correct:2, teacher:"Prof. Mehta" },
  { id:131, subject:"Economics", chapter:"Utility Analysis", q:"Utility differs from:",                                                                  opts:["Time to time","Person to person","Product to product","All of the above"],                                        correct:3, teacher:"Prof. Mehta" },
  { id:132, subject:"Economics", chapter:"Utility Analysis", q:"Utility is ethically neutral. This statement is:",                                       opts:["True","False","Partially True","Nothing can be said"],                                                             correct:0, teacher:"Prof. Mehta" },
  { id:133, subject:"Economics", chapter:"Utility Analysis", q:"Which utility approach suggests Utility can be measured and quantified?",                opts:["Cardinal","Ordinal","Both (a) and (b)","Neither approach"],                                                        correct:0, teacher:"Prof. Mehta" },
  { id:134, subject:"Economics", chapter:"Utility Analysis", q:"Which utility approach is based on the Marshallian school of thought?",                  opts:["Cardinal Utility Approach","Ordinal Utility Approach","Independent Variables Approach","Both (a) and (b)"],      correct:0, teacher:"Prof. Mehta" },
  { id:135, subject:"Economics", chapter:"Utility Analysis", q:"Who is the main exponent of Marginal Utility Analysis?",                                 opts:["Keynes","Hicks","Paul Samuelson","Marshall"],                                                                      correct:3, teacher:"Prof. Mehta" },
  { id:136, subject:"Economics", chapter:"Utility Analysis", q:"According to Marginal Utility Analysis, Utility can be measured in:",                    opts:["Ranks","Cardinal Numbers","Nominal Values","All of the above"],                                                    correct:1, teacher:"Prof. Mehta" },
  { id:137, subject:"Economics", chapter:"Utility Analysis", q:"Cardinal Utility Approach is also called as:",                                           opts:["Indifference Curve Analysis","Hicks and Allen Approach","Marginal Utility Analysis","All of the above"],          correct:2, teacher:"Prof. Mehta" },
  { id:138, subject:"Economics", chapter:"Utility Analysis", q:"Total Utility is the sum total of Utility derived from:",                                opts:["Ordinal units","Average units","All units consumed","Marginal units only"],                                        correct:2, teacher:"Prof. Mehta" },
  { id:139, subject:"Economics", chapter:"Utility Analysis", q:"Total Utility is maximum when:",                                                         opts:["Marginal Utility is zero","MU is at its highest","MU equals Average Utility","None of the above"],                 correct:0, teacher:"Prof. Mehta" },
  { id:140, subject:"Economics", chapter:"Utility Analysis", q:"Marginal Utility can be:",                                                               opts:["Always positive","Positive or negative but not zero","Always negative","Positive, negative or zero"],             correct:3, teacher:"Prof. Mehta" },
  { id:141, subject:"Economics", chapter:"Utility Analysis", q:"TU for 10 cups of Coffee = 99; TU for 11 cups = 95. Marginal Utility of 11th cup is:",  opts:["-4","6","10","-3.5"],                                                                                             correct:0, teacher:"Prof. Mehta" },
  { id:142, subject:"Economics", chapter:"Utility Analysis", q:"Cardinal Approach to Utility analyses:",                                                 opts:["One Commodity at a time","Two Commodities at a time","Many Commodities","None of the above"],                     correct:0, teacher:"Prof. Mehta" },
  { id:143, subject:"Economics", chapter:"Utility Analysis", q:"Which of the following is an assumption under Cardinal Approach to Utility Analysis?",   opts:["Measurability of Utility in monetary terms","Change in Marginal Utility of Money","Utility at zero consumption","All of the above"], correct:0, teacher:"Prof. Mehta" },

  // ══ TIME VALUE OF MONEY — 20 Qs (AVJ Academy) ══
  { id:6,  subject:"Maths", chapter:"Time Value of Money", q:"The difference in SI and CI on a certain sum of money in 2 years at 15% p.a. is ₹144. The sum is –",                                                                       opts:["₹6,000","₹6,200","₹6,300","₹6,400"],                                        correct:3, teacher:"Prof. Sharma" },
  { id:7,  subject:"Maths", chapter:"Time Value of Money", q:"If the sum of money when compounded annually becomes ₹1,140 in 2 years and ₹1,710 in 3 years, the rate of interest is –",                                                  opts:["30%","40%","50%","60%"],                                                     correct:2, teacher:"Prof. Sharma" },
  { id:8,  subject:"Maths", chapter:"Time Value of Money", q:"For a 10-year deposit, what interest rate payable annually is equivalent to 5% interest payable quarterly?",                                                               opts:["5.1%","4.9%","6.0%","None of these"],                                        correct:3, teacher:"Prof. Sharma" },
  { id:9,  subject:"Maths", chapter:"Time Value of Money", q:"Given the annuity of ₹100 amounts to ₹3,137.12 at 4.5% p.a. CI. The number of years will be –",                                                                           opts:["25 years","20 years","22 years","None of these"],                             correct:1, teacher:"Prof. Sharma" },
  { id:10, subject:"Maths", chapter:"Time Value of Money", q:"Alibaba borrows ₹6 lakhs housing loan at 6% repayable in 20 annual instalments. How much is the annual payment?",                                                          opts:["₹52,420","₹52,419","₹52,310","₹52,320"],                                    correct:0, teacher:"Prof. Sharma" },
  { id:11, subject:"Maths", chapter:"Time Value of Money", q:"Mr. Paul borrows ₹25,000 to repay with C.I. at 7% p.a. in annual instalments of ₹3,000 each. The number of years to pay off the debt is –",                              opts:["10","12","11","13"],                                                          correct:3, teacher:"Prof. Sharma" },
  { id:12, subject:"Maths", chapter:"Time Value of Money", q:"How much must be invested every year to accumulate ₹3,00,000 at the end of 10 years if interest is compounded annually at 10%?",                                           opts:["₹18,222.63","₹18,823.62","₹18,725.52","₹18,955.06"],                        correct:1, teacher:"Prof. Sharma" },
  { id:13, subject:"Maths", chapter:"Time Value of Money", q:"A sum of ₹46,875 was lent at simple interest. At the end of 1 year 8 months, the total amount was ₹50,000. Find the rate of interest.",                                   opts:["4%","5%","4.5%","6%"],                                                       correct:0, teacher:"Prof. Sharma" },
  { id:14, subject:"Maths", chapter:"Time Value of Money", q:"A certain sum at simple interest amounts to Rs.2,800 in 2 years and Rs.3,220 in 5 years. The rate of interest p.a. is:",                                                   opts:["6 1/3 %","5 5/9 %","2 1/4 %","6 1/8 %"],                                    correct:1, teacher:"Prof. Sharma" },
  { id:15, subject:"Maths", chapter:"Time Value of Money", q:"A sum is invested at 5% p.a. and double of it at 4% p.a. Total interest is ₹130 per year. The sum invested at 4% is –",                                                   opts:["₹1,000","₹2,000","₹3,000","None of these"],                                 correct:1, teacher:"Prof. Sharma" },
  { id:16, subject:"Maths", chapter:"Time Value of Money", q:"At what rate per cent compound interest does a sum of money become four-fold in 2 years?",                                                                                  opts:["150%","100%","200%","400%"],                                                  correct:1, teacher:"Prof. Sharma" },
  { id:17, subject:"Maths", chapter:"Time Value of Money", q:"Compound interest on half-yearly rests on ₹10,000 at 6% p.a. for first two years and 9% p.a. for third year is –",                                                        opts:["₹2,290","₹2,287","₹2,285","₹2,283"],                                        correct:0, teacher:"Prof. Sharma" },
  { id:18, subject:"Maths", chapter:"Time Value of Money", q:"₹200 is invested at end of each month at 6% p.a. compounded monthly. Future value after 10th payment (given (1.005)^10 = 1.0511) is –",                                   opts:["₹2,000","₹2,050","₹2,025","₹2,044"],                                        correct:3, teacher:"Prof. Sharma" },
  { id:19, subject:"Maths", chapter:"Time Value of Money", q:"A person invests ₹500 at end of each year at 10% p.a. CI. Amount one year after the 12th annual investment is –",                                                          opts:["₹11,761.35","₹10,000","₹12,000","None of these"],                            correct:0, teacher:"Prof. Sharma" },
  { id:20, subject:"Maths", chapter:"Time Value of Money", q:"Raja (age 40) wants wife to have ₹40 lakhs on his death (30-year life). He makes equal annual investments from now at 3% CI. Annual investment amount is –",               opts:["₹84,448","₹84,450","₹84,419","₹81,628"],                                    correct:3, teacher:"Prof. Sharma" },
  { id:21, subject:"Maths", chapter:"Time Value of Money", q:"A machine depreciates at 10% of its value at beginning of year. Cost ₹23,240 and scrap value ₹9,000. For how many years was the machine used?",                           opts:["7 years","8 years","9 years","10 years"],                                    correct:2, teacher:"Prof. Sharma" },
  { id:22, subject:"Maths", chapter:"Time Value of Money", q:"A man paid ₹2,00,000 on a house worth ₹3,00,000. Balance with 12% p.a. CI (half-yearly) in 20 equal half-yearly instalments. Each instalment amount is –",               opts:["₹8,719 approx.","₹8,769 approx.","₹7,893 approx.","None of these"],         correct:0, teacher:"Prof. Sharma" },
  { id:23, subject:"Maths", chapter:"Time Value of Money", q:"A person gets perpetuity of ₹5,000 half-yearly with annual growth rate of 5%. Required return is 15% p.a. Present value is –",                                            opts:["₹1,00,000","₹2,00,000","₹2,40,000","None of these"],                        correct:0, teacher:"Prof. Sharma" },
  { id:24, subject:"Maths", chapter:"Time Value of Money", q:"A sinking fund is created for redeeming debentures of ₹5 lakhs at the end of 25 years. Annual provision required at 4% p.a. interest is –",                              opts:["₹12,006","₹12,040","₹12,039","₹12,035"],                                    correct:0, teacher:"Prof. Sharma" },
  { id:25, subject:"Maths", chapter:"Time Value of Money", q:"A machine costs ₹5,20,000 with life 25 years. New model costs 25% more. Scrap value ₹1,25,000. Amount set aside yearly at 3.5% CI for sinking fund is –",               opts:["₹13,479","₹16,500","₹16,050","₹16,005"],                                    correct:0, teacher:"Prof. Sharma" },
];

/* ── STYLES ── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;background:#08080f;color:#efefff;min-height:100vh}

/* LOGIN */
.login-page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:1.5rem;
  background:radial-gradient(ellipse at 30% 40%,#15104a 0%,transparent 55%),
             radial-gradient(ellipse at 75% 70%,#08243a 0%,transparent 50%),#08080f}
.login-wrap{width:100%;max-width:420px}
.login-brand{text-align:center;margin-bottom:2rem}
.login-brand h1{font-family:'Syne',sans-serif;font-size:1.9rem;font-weight:800;
  background:linear-gradient(135deg,#efefff 20%,#818cf8 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.login-brand p{color:#7777aa;font-size:.85rem;margin-top:.3rem}
.login-box{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:22px;padding:2rem;backdrop-filter:blur(12px)}
.role-toggle{display:flex;background:rgba(255,255,255,.05);border-radius:12px;padding:.3rem;margin-bottom:1.5rem;gap:.3rem}
.role-tab{flex:1;padding:.55rem;border:none;background:none;color:#7777aa;border-radius:9px;cursor:pointer;font-size:.85rem;font-weight:600;font-family:'Inter',sans-serif;transition:all .2s}
.role-tab.act{background:rgba(99,102,241,.25);color:#818cf8}
.lbl{font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#7777aa;margin-bottom:.4rem;display:block}
.inp{width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:10px;
  padding:.7rem 1rem;color:#efefff;font-size:.92rem;font-family:'Inter',sans-serif;outline:none;transition:border-color .2s;margin-bottom:1rem}
.inp:focus{border-color:#818cf8}
.inp option{background:#1a1a2e}
.login-btn{width:100%;background:linear-gradient(135deg,#6366f1,#818cf8);color:#fff;border:none;border-radius:12px;
  padding:.85rem;font-size:.95rem;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;transition:all .2s;margin-top:.3rem}
.login-btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(99,102,241,.4)}
.login-btn:disabled{opacity:.4;cursor:not-allowed;transform:none;box-shadow:none}
.err{color:#f87171;font-size:.8rem;text-align:center;margin-top:.5rem}
.hint{background:rgba(99,102,241,.08);border:1px solid rgba(99,102,241,.18);border-radius:10px;
  padding:.8rem 1rem;font-size:.76rem;color:#7777aa;margin-top:1rem;line-height:1.7}

/* TOPBAR */
.topbar{display:flex;align-items:center;justify-content:space-between;padding:.85rem 1.4rem;
  background:rgba(255,255,255,.03);border-bottom:1px solid rgba(255,255,255,.07);position:sticky;top:0;z-index:100;backdrop-filter:blur(14px)}
.tb-logo{font-family:'Syne',sans-serif;font-size:1.1rem;color:#818cf8;font-weight:800}
.tb-user{font-size:.82rem;color:#7777aa;background:rgba(255,255,255,.05);padding:.3rem .85rem;border-radius:50px}
.tb-r{display:flex;gap:.5rem;align-items:center}
.ghost{background:none;border:1px solid rgba(255,255,255,.11);color:#7777aa;padding:.32rem .8rem;
  border-radius:8px;cursor:pointer;font-size:.78rem;transition:all .2s;font-family:'Inter',sans-serif}
.ghost:hover{border-color:#818cf8;color:#818cf8}

/* PAGE */
.page{padding:1.4rem;max-width:860px;margin:0 auto;width:100%}
.pg-h{font-family:'Syne',sans-serif;font-size:1.6rem;margin-bottom:.2rem}
.pg-s{color:#7777aa;font-size:.85rem;margin-bottom:1.6rem}

/* TABS */
.tabs{display:flex;gap:.3rem;border-bottom:1px solid rgba(255,255,255,.07);margin-bottom:1.6rem;flex-wrap:wrap}
.tab{background:none;border:none;color:#7777aa;padding:.6rem 1.1rem;cursor:pointer;font-size:.84rem;
  font-family:'Inter',sans-serif;border-bottom:2px solid transparent;transition:all .2s;margin-bottom:-1px}
.tab.act{color:#818cf8;border-bottom-color:#818cf8}
.tab:hover:not(.act){color:#efefff}

/* STATS */
.stats{display:flex;gap:.7rem;flex-wrap:wrap;margin-bottom:1.5rem}
.sc{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:13px;padding:.85rem 1.1rem;text-align:center;flex:1;min-width:80px}
.sv{font-family:'Syne',sans-serif;font-size:1.5rem;color:#818cf8}
.sl{font-size:.7rem;color:#7777aa;margin-top:.1rem}

/* FORM */
.card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:1.6rem}
.fg{margin-bottom:1.1rem}
.opts2{display:grid;grid-template-columns:1fr 1fr;gap:.55rem}
.or{display:flex;align-items:center;gap:.45rem}
.ol2{width:25px;height:25px;border-radius:7px;display:flex;align-items:center;justify-content:center;
  font-size:.72rem;font-weight:700;background:rgba(99,102,241,.15);color:#818cf8;flex-shrink:0}
.tick{width:25px;height:25px;border-radius:50%;border:2px solid rgba(255,255,255,.12);background:none;
  cursor:pointer;font-size:.68rem;transition:all .2s;flex-shrink:0;display:flex;align-items:center;justify-content:center}
.tick.on{background:#22c55e;border-color:#22c55e;color:#fff}
.pri{width:100%;background:linear-gradient(135deg,#6366f1,#818cf8);color:#fff;border:none;border-radius:11px;
  padding:.82rem;font-size:.92rem;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;transition:all .2s;margin-top:.8rem}
.pri:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(99,102,241,.35)}
.pri:disabled{opacity:.4;cursor:not-allowed;transform:none;box-shadow:none}

/* Q LIST */
.ql{display:flex;flex-direction:column;gap:.7rem}
.qc{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:15px;padding:1.1rem 1.3rem;display:flex;gap:.8rem;align-items:flex-start}
.qn{width:32px;height:32px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.78rem;background:rgba(99,102,241,.15);color:#818cf8;flex-shrink:0}
.qb{flex:1}
.tag{display:inline-block;font-size:.66rem;font-weight:700;letter-spacing:.09em;text-transform:uppercase;padding:.18rem .6rem;border-radius:50px;margin-right:.3rem;margin-bottom:.4rem}
.qt{font-size:.9rem;margin-bottom:.55rem}
.qos{display:flex;gap:.35rem;flex-wrap:wrap}
.qo{font-size:.74rem;padding:.22rem .55rem;border-radius:6px;background:rgba(255,255,255,.05);color:#7777aa}
.qo.ck{background:rgba(34,197,94,.12);color:#4ade80}
.del{background:none;border:1px solid rgba(255,255,255,.08);color:#7777aa;border-radius:7px;padding:.3rem .55rem;cursor:pointer;font-size:.76rem;transition:all .2s}
.del:hover{border-color:#ef4444;color:#ef4444}

/* SUBJECT CARDS */
.subj-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem}
.subj-card{border-radius:18px;padding:1.8rem 1.4rem;cursor:pointer;border:1px solid rgba(255,255,255,.08);transition:all .3s;text-align:left}
.subj-card:hover{transform:translateY(-4px);box-shadow:0 16px 32px rgba(0,0,0,.5)}
.subj-icon{font-size:2.2rem;margin-bottom:.7rem}
.subj-name{font-family:'Syne',sans-serif;font-size:1.2rem;font-weight:700;margin-bottom:.25rem}
.subj-cnt{font-size:.78rem;opacity:.6}

/* CHAPTER LIST */
.ch-list{display:flex;flex-direction:column;gap:.55rem}
.ch-row{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:13px;padding:.9rem 1.1rem;
  display:flex;align-items:center;justify-content:space-between;cursor:pointer;transition:all .2s}
.ch-row:hover{border-color:#818cf8;background:rgba(99,102,241,.07)}
.ch-name{font-size:.92rem;font-weight:500}
.ch-cnt{font-size:.76rem;color:#7777aa}
.start-btn{background:linear-gradient(135deg,#6366f1,#818cf8);color:#fff;border:none;border-radius:8px;
  padding:.38rem .9rem;font-size:.78rem;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;white-space:nowrap}

/* QUIZ */
.qwrap{max-width:660px;margin:0 auto}
.qhdr{display:flex;align-items:center;gap:.9rem;margin-bottom:1.4rem}
.prog{flex:1;height:5px;background:rgba(255,255,255,.07);border-radius:50px}
.pfill{height:100%;border-radius:50px;background:linear-gradient(90deg,#6366f1,#818cf8);transition:width .4s}
.qctr{font-size:.78rem;color:#7777aa;white-space:nowrap}
.tring{position:relative;width:44px;height:44px;flex-shrink:0}
.tsvg{transform:rotate(-90deg)}
.tnum{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.8rem}
.qbox{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:1.9rem}
.qtext{font-family:'Syne',sans-serif;font-size:1.15rem;line-height:1.55;margin-bottom:1.6rem}
.qopts{display:flex;flex-direction:column;gap:.65rem}
.qopt{background:rgba(255,255,255,.04);border:2px solid rgba(255,255,255,.08);border-radius:12px;padding:.85rem 1rem;
  cursor:pointer;display:flex;align-items:center;gap:.8rem;transition:all .18s;text-align:left;
  font-family:'Inter',sans-serif;color:#efefff;font-size:.9rem;width:100%}
.qopt:hover:not(.dn){border-color:#818cf8;background:rgba(99,102,241,.08)}
.qopt.sl{border-color:#818cf8;background:rgba(99,102,241,.1)}
.qopt.ok{border-color:#22c55e;background:rgba(34,197,94,.1)}
.qopt.wr{border-color:#ef4444;background:rgba(239,68,68,.08)}
.qopt.dn{cursor:default}
.olt{width:29px;height:29px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.78rem;background:rgba(255,255,255,.07);flex-shrink:0}
.nxt{margin-top:1.2rem;background:linear-gradient(135deg,#6366f1,#818cf8);color:#fff;border:none;
  border-radius:11px;padding:.72rem 1.6rem;font-size:.88rem;font-weight:700;cursor:pointer;float:right;
  font-family:'Inter',sans-serif;transition:all .2s}
.nxt:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(99,102,241,.4)}
.cf::after{content:"";display:table;clear:both}

/* RESULT */
.res{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:2.3rem 1.8rem;text-align:center}
.sring{width:120px;height:120px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;
  margin:0 auto 1.2rem;border:3px solid #6366f1;background:rgba(99,102,241,.1)}
.snum{font-family:'Syne',sans-serif;font-size:2.6rem;font-weight:800;color:#818cf8;line-height:1}
.stot{font-size:.8rem;color:#7777aa}
.rh{font-family:'Syne',sans-serif;font-size:1.5rem;margin-bottom:.35rem}
.rm{color:#7777aa;font-size:.88rem;margin-bottom:1.5rem}
.rstats{display:flex;gap:.7rem;justify-content:center;flex-wrap:wrap;margin-bottom:1rem}
.revl{display:flex;flex-direction:column;gap:.55rem;margin-top:1.1rem}
.revi{background:rgba(255,255,255,.03);border-radius:10px;padding:.85rem 1rem;display:flex;gap:.65rem;align-items:flex-start;text-align:left}
.rq{font-size:.85rem;margin-bottom:.22rem}
.ra{font-size:.76rem;color:#7777aa}
.outbtn{background:rgba(99,102,241,.1);border:1px solid #6366f1;color:#818cf8;border-radius:10px;padding:.65rem 1.5rem;
  cursor:pointer;font-size:.85rem;font-weight:600;font-family:'Inter',sans-serif;transition:all .2s;margin:.25rem}
.outbtn:hover{background:rgba(99,102,241,.2)}

/* LB */
.lb{width:100%;border-collapse:collapse}
.lb th{text-align:left;font-size:.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#7777aa;padding:.55rem .9rem;border-bottom:1px solid rgba(255,255,255,.07)}
.lb td{padding:.7rem .9rem;border-bottom:1px solid rgba(255,255,255,.05);font-size:.85rem}
.lb tr:hover td{background:rgba(255,255,255,.02)}
.pbar{width:90px;height:5px;background:rgba(255,255,255,.07);border-radius:50px;display:inline-block}
.pbf{height:100%;border-radius:50px;background:linear-gradient(90deg,#6366f1,#818cf8)}

/* FILTER PILLS */
.pills{display:flex;gap:.4rem;flex-wrap:wrap;margin-bottom:1rem}
.pill{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);color:#7777aa;border-radius:8px;
  padding:.28rem .75rem;cursor:pointer;font-size:.78rem;font-family:'Inter',sans-serif;transition:all .15s}
.pill.on{background:rgba(99,102,241,.2);border-color:#6366f1;color:#818cf8}

/* TOAST */
.toast{position:fixed;top:1.2rem;right:1.2rem;background:#22c55e;color:#fff;padding:.7rem 1.3rem;
  border-radius:11px;font-weight:600;font-size:.84rem;z-index:999;animation:ti .25s ease}
@keyframes ti{from{transform:translateX(70px);opacity:0}to{transform:translateX(0);opacity:1}}
.empty{text-align:center;padding:2.5rem;color:#7777aa}
.emi{font-size:2.3rem;margin-bottom:.7rem}
.bk{cursor:pointer;display:inline-flex;align-items:center;gap:.4rem;color:#7777aa;font-size:.82rem;margin-bottom:1rem;transition:color .2s}
.bk:hover{color:#818cf8}
`;

function shuffle(a){return[...a].sort(()=>Math.random()-.5)}

/* ═══ ROOT ═══ */
export default function App(){
  const [user,setUser]       = useState(null);
  const [questions,setQuestions] = useState(DEMO_QS);
  const [leaderboard,setLeaderboard] = useState([]);
  const [students,setStudents] = useState(STUDENTS);
  const [toast,setToast]     = useState(null);
  const addToast = m=>{setToast(m);setTimeout(()=>setToast(null),2500)};
  const addScore = e=>setLeaderboard(p=>[e,...p].slice(0,200));

  // keep STUDENTS in sync so login works with newly added students
  const loginCheck=(name,pass)=>{
    if(name.trim().toLowerCase()==="admin" && pass===ADMIN.pass)
      return {...ADMIN, name:"Admin", role:"teacher"};
    const s=students.find(s=>s.name.toLowerCase()===name.trim().toLowerCase()&&s.pass===pass);
    return s ? {...s,role:"student"} : null;
  };

  return(
    <>
      <style>{CSS}</style>
      {toast&&<div className="toast">✓ {toast}</div>}
      {!user
        ? <LoginPage onLogin={setUser} loginCheck={loginCheck}/>
        : user.role==="teacher"
          ? <TeacherPanel user={user} questions={questions} setQuestions={setQuestions}
              leaderboard={leaderboard} students={students} setStudents={setStudents}
              toast={addToast} onLogout={()=>setUser(null)}/>
          : <StudentPanel user={user} questions={questions} leaderboard={leaderboard}
              addScore={addScore} onLogout={()=>setUser(null)}/>
      }
    </>
  );
}

/* ── LOGIN ── */
function LoginPage({onLogin, loginCheck}){
  const [name,setName]=useState("");
  const [pass,setPass]=useState("");
  const [err,setErr]=useState("");

  const go=()=>{
    if(!name.trim()){setErr("Please enter your name.");return;}
    if(!pass.trim()){setErr("Please enter your password.");return;}
    const result = loginCheck(name,pass);
    if(result){ onLogin(result); }
    else { setErr("Wrong name or password."); }
  };

  return(
    <div className="login-page">
      <div className="login-wrap">
        <div className="login-brand">
          <h1>CA Foundation Quiz</h1>
          <p>Maths & Economics — Practice MCQs</p>
        </div>
        <div className="login-box">
          <label className="lbl">Name</label>
          <input className="inp" placeholder="Enter your name"
            value={name} onChange={e=>{setName(e.target.value);setErr("")}}
            onKeyDown={e=>e.key==="Enter"&&go()}/>
          <label className="lbl">Password</label>
          <input className="inp" type="password" placeholder="Enter your password"
            value={pass} onChange={e=>{setPass(e.target.value);setErr("")}}
            onKeyDown={e=>e.key==="Enter"&&go()}/>
          {err&&<div className="err">{err}</div>}
          <button className="login-btn" onClick={go} disabled={!name.trim()||!pass.trim()}>
            Login →
          </button>
          <div className="hint">
            <b>Student credentials:</b><br/>
            Rahul Verma / stu123 &nbsp;·&nbsp; Priya Shah / stu456<br/>
            Amit Patel / stu789 &nbsp;·&nbsp; Sneha Gupta / stu000
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ TEACHER PANEL ═══ */
function TeacherPanel({user,questions,setQuestions,leaderboard,students,setStudents,toast,onLogout}){
  const [tab,setTab]=useState("add");
  const tabs=[
    ["add",    "➕ Add Q"],
    ["manage", `📋 Manage (${questions.length})`],
    ["students",`👥 Students (${students.length})`],
    ["perf",   "📊 Performance"],
    ["lb",     "🏆 Leaderboard"],
  ];
  return(
    <div>
      <div className="topbar">
        <div className="tb-logo">CA Foundation Quiz</div>
        <div className="tb-user">🧑‍🏫 Admin</div>
        <div className="tb-r"><button className="ghost" onClick={onLogout}>Logout</button></div>
      </div>
      <div className="page">
        <div className="pg-h">Admin Dashboard</div>
        <div className="pg-s">Manage questions, students and track performance</div>
        <div className="stats">
          <div className="sc"><div className="sv">{questions.length}</div><div className="sl">Total Qs</div></div>
          <div className="sc"><div className="sv">{students.length}</div><div className="sl">Students</div></div>
          <div className="sc"><div className="sv">{leaderboard.length}</div><div className="sl">Attempts</div></div>
        </div>
        <div className="tabs">
          {tabs.map(([k,l])=>(
            <button key={k} className={`tab ${tab===k?"act":""}`} onClick={()=>setTab(k)}>{l}</button>
          ))}
        </div>
        {tab==="add"      && <AddForm questions={questions} setQuestions={setQuestions} toast={toast} done={()=>setTab("manage")}/>}
        {tab==="manage"   && <ManageQs questions={questions} setQuestions={setQuestions} toast={toast}/>}
        {tab==="students" && <ManageStudents students={students} setStudents={setStudents} toast={toast}/>}
        {tab==="perf"     && <Performance leaderboard={leaderboard} students={students}/>}
        {tab==="lb"       && <LeaderboardView leaderboard={leaderboard}/>}
      </div>
    </div>
  );
}

/* ADD FORM */
function AddForm({questions,setQuestions,toast,done}){
  const [f,setF]=useState({subject:"Maths",chapter:SUBJECTS.Maths.chapters[0],q:"",opts:["","","",""],correct:null});
  const setO=(i,v)=>{const o=[...f.opts];o[i]=v;setF({...f,opts:o})};
  const sub=()=>{
    if(!f.q.trim())return alert("Enter question.");
    if(f.opts.some(o=>!o.trim()))return alert("Fill all 4 options.");
    if(f.correct===null)return alert("Mark the correct answer.");
    setQuestions(p=>[...p,{id:Date.now(),subject:f.subject,chapter:f.chapter,q:f.q,opts:f.opts,correct:f.correct,teacher:"Admin"}]);
    setF({...f,q:"",opts:["","","",""],correct:null});
    toast("Question added!"); done();
  };
  const chapters=SUBJECTS[f.subject].chapters;
  return(
    <div className="card">
      <div className="fg">
        <label className="lbl">Subject</label>
        <select className="inp" value={f.subject} onChange={e=>setF({...f,subject:e.target.value,chapter:SUBJECTS[e.target.value].chapters[0]})}>
          {Object.keys(SUBJECTS).map(s=><option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="fg">
        <label className="lbl">Chapter</label>
        <select className="inp" value={f.chapter} onChange={e=>setF({...f,chapter:e.target.value})}>
          {chapters.map(c=><option key={c}>{c}</option>)}
        </select>
      </div>
      <div className="fg">
        <label className="lbl">Question</label>
        <textarea className="inp" rows={3} placeholder="Type your question..." value={f.q} onChange={e=>setF({...f,q:e.target.value})} style={{resize:"vertical"}}/>
      </div>
      <div className="fg">
        <label className="lbl">Options &nbsp;<span style={{color:"#4ade80",fontSize:".7rem",fontWeight:400,textTransform:"none"}}>— click ✓ to mark correct answer</span></label>
        <div className="opts2">
          {["A","B","C","D"].map((lt,i)=>(
            <div className="or" key={i}>
              <div className="ol2">{lt}</div>
              <input className="inp" style={{margin:0,flex:1}} placeholder={`Option ${lt}`} value={f.opts[i]} onChange={e=>setO(i,e.target.value)}/>
              <button className={`tick ${f.correct===i?"on":""}`} onClick={()=>setF({...f,correct:i})}>✓</button>
            </div>
          ))}
        </div>
      </div>
      <button className="pri" onClick={sub}>Add Question →</button>
    </div>
  );
}

/* MANAGE */
function ManageQs({questions,setQuestions,toast}){
  const [fs,setFs]=useState("All");[["All",...Object.keys(SUBJECTS)]];
  const del=id=>{setQuestions(p=>p.filter(q=>q.id!==id));toast("Deleted.");};
  const list=fs==="All"?questions:questions.filter(q=>q.subject===fs);
  return(
    <div>
      <div className="pills">
        {["All",...Object.keys(SUBJECTS)].map(s=>(
          <button key={s} className={`pill ${fs===s?"on":""}`} onClick={()=>setFs(s)}>
            {s!=="All"&&SUBJECTS[s].icon+" "}{s} {s!=="All"&&`(${questions.filter(q=>q.subject===s).length})`}
          </button>
        ))}
      </div>
      <div className="ql">
        {!list.length&&<div className="empty"><div className="emi">📭</div>No questions yet.</div>}
        {list.map((q,i)=>{
          const col=SUBJECTS[q.subject]?.color||"#6366f1";
          return(
            <div className="qc" key={q.id}>
              <div className="qn">{i+1}</div>
              <div className="qb">
                <span className="tag" style={{background:`${col}1a`,color:col}}>{SUBJECTS[q.subject]?.icon} {q.subject}</span>
                <span className="tag" style={{background:"rgba(255,255,255,.06)",color:"#7777aa"}}>{q.chapter}</span>
                <div className="qt">{q.q}</div>
                <div className="qos">{q.opts.map((o,j)=><span key={j} className={`qo ${j===q.correct?"ck":""}`}>{["A","B","C","D"][j]}. {o} {j===q.correct?"✓":""}</span>)}</div>
                <div style={{fontSize:".7rem",color:"#7777aa",marginTop:".35rem"}}>By {q.teacher}</div>
              </div>
              <button className="del" onClick={()=>del(q.id)}>🗑</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── MANAGE STUDENTS ── */
function ManageStudents({students,setStudents,toast}){
  const [fname,setFname]=useState("");
  const [fpass,setFpass]=useState("");
  const [err,setErr]=useState("");

  const add=()=>{
    if(!fname.trim()){setErr("Enter student name.");return;}
    if(fpass.length<4){setErr("Password must be at least 4 characters.");return;}
    if(students.find(s=>s.name.toLowerCase()===fname.trim().toLowerCase())){setErr("Student already exists.");return;}
    setStudents(p=>[...p,{id:"s"+Date.now(),name:fname.trim(),pass:fpass.trim(),avatar:"🎓"}]);
    setFname(""); setFpass(""); setErr("");
    toast("Student added!");
  };

  const remove=(id)=>{ setStudents(p=>p.filter(s=>s.id!==id)); toast("Student removed."); };

  return(
    <div>
      <div className="card" style={{marginBottom:"1.2rem"}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".95rem",marginBottom:"1rem"}}>➕ Add New Student</div>
        <div style={{display:"flex",gap:".7rem",flexWrap:"wrap"}}>
          <div style={{flex:2,minWidth:"140px"}}>
            <label className="lbl">Student Name</label>
            <input className="inp" style={{margin:0}} placeholder="e.g. Rohan Mehta"
              value={fname} onChange={e=>{setFname(e.target.value);setErr("");}}
              onKeyDown={e=>e.key==="Enter"&&add()}/>
          </div>
          <div style={{flex:1,minWidth:"120px"}}>
            <label className="lbl">Password</label>
            <input className="inp" style={{margin:0}} placeholder="min 4 chars"
              value={fpass} onChange={e=>{setFpass(e.target.value);setErr("");}}
              onKeyDown={e=>e.key==="Enter"&&add()}/>
          </div>
        </div>
        {err && <div style={{color:"#f87171",fontSize:".78rem",marginTop:".5rem"}}>{err}</div>}
        <button className="pri" style={{marginTop:".8rem"}} onClick={add}>Add Student →</button>
      </div>

      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".88rem",marginBottom:".7rem"}}>
        👥 All Students ({students.length})
      </div>
      <div className="ql">
        {students.length===0 && <div className="empty"><div className="emi">👤</div>No students yet. Add one above.</div>}
        {students.map((s)=>(
          <div key={s.id} style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",
            borderRadius:"13px",padding:".85rem 1.1rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:".8rem"}}>
            <div style={{display:"flex",alignItems:"center",gap:".75rem"}}>
              <div style={{width:"34px",height:"34px",borderRadius:"10px",background:"rgba(8,145,178,.15)",
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1rem",flexShrink:0}}>🎓</div>
              <div>
                <div style={{fontWeight:600,fontSize:".88rem"}}>{s.name}</div>
                <div style={{fontSize:".72rem",color:"#7777aa"}}>Password: {s.pass}</div>
              </div>
            </div>
            <button className="del" onClick={()=>remove(s.id)}>🗑</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── PERFORMANCE ── */
function Performance({leaderboard,students}){
  const [filter,setFilter]=useState("All");

  const summary=students.map(s=>{
    const att=leaderboard.filter(e=>e.student===s.name);
    const avg=att.length ? Math.round(att.reduce((a,e)=>a+e.pct,0)/att.length) : null;
    const best=att.length ? Math.max(...att.map(e=>e.pct)) : null;
    return{...s, attempts:att.length, avg, best};
  }).sort((a,b)=>(b.avg||0)-(a.avg||0));

  const shown=filter==="All" ? leaderboard : leaderboard.filter(e=>e.student===filter);
  const names=["All",...[...new Set(leaderboard.map(e=>e.student))]];

  return(
    <div>
      {/* Summary */}
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".88rem",marginBottom:".8rem"}}>📊 Student Summary</div>
      {summary.length===0
        ? <div className="empty"><div className="emi">📊</div>No data yet. Students need to attempt quizzes first.</div>
        : <div style={{display:"flex",flexDirection:"column",gap:".55rem",marginBottom:"1.5rem"}}>
            {summary.map(s=>(
              <div key={s.id} style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.08)",
                borderRadius:"14px",padding:"1rem 1.2rem",display:"flex",alignItems:"center",gap:"1rem",flexWrap:"wrap"}}>
                <div style={{width:"36px",height:"36px",borderRadius:"10px",background:"rgba(99,102,241,.15)",
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1rem",flexShrink:0}}>🎓</div>
                <div style={{flex:1,minWidth:"100px"}}>
                  <div style={{fontWeight:600,fontSize:".88rem"}}>{s.name}</div>
                  <div style={{fontSize:".7rem",color:"#7777aa"}}>{s.attempts} attempt{s.attempts!==1?"s":""}</div>
                </div>
                {s.avg!==null ? (
                  <>
                    <div style={{textAlign:"center"}}>
                      <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.2rem",color:"#818cf8",fontWeight:700}}>{s.avg}%</div>
                      <div style={{fontSize:".62rem",color:"#7777aa"}}>Avg</div>
                    </div>
                    <div style={{textAlign:"center"}}>
                      <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.2rem",color:"#4ade80",fontWeight:700}}>{s.best}%</div>
                      <div style={{fontSize:".62rem",color:"#7777aa"}}>Best</div>
                    </div>
                    <div style={{width:"70px"}}>
                      <div style={{height:"5px",background:"rgba(255,255,255,.07)",borderRadius:"50px"}}>
                        <div style={{height:"100%",borderRadius:"50px",
                          background:`linear-gradient(90deg,${s.avg>=80?"#22c55e":s.avg>=60?"#f59e0b":"#ef4444"},${s.avg>=80?"#4ade80":s.avg>=60?"#fbbf24":"#f87171"})`,
                          width:`${s.avg}%`}}/>
                      </div>
                    </div>
                  </>
                ) : (
                  <div style={{fontSize:".75rem",color:"#7777aa",fontStyle:"italic"}}>No attempts yet</div>
                )}
              </div>
            ))}
          </div>
      }

      {/* Attempt history */}
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".88rem",marginBottom:".7rem"}}>📋 Attempt History</div>
      <div className="pills">
        {names.map(n=><button key={n} className={`pill ${filter===n?"on":""}`} onClick={()=>setFilter(n)}>{n}</button>)}
      </div>
      {shown.length===0
        ? <div className="empty"><div className="emi">📋</div>{filter==="All"?"No attempts yet.":"No attempts for this student."}</div>
        : <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.08)",borderRadius:"15px",overflow:"hidden"}}>
            <table className="lb">
              <thead><tr><th>#</th><th>Student</th><th>Subject</th><th>Chapter</th><th>Score</th><th>%</th></tr></thead>
              <tbody>
                {shown.map((e,i)=>(
                  <tr key={i}>
                    <td style={{color:"#7777aa"}}>{i+1}</td>
                    <td style={{fontWeight:500}}>{e.student}</td>
                    <td><span style={{color:SUBJECTS[e.subject]?.color||"#818cf8",fontSize:".78rem"}}>{SUBJECTS[e.subject]?.icon} {e.subject}</span></td>
                    <td style={{color:"#7777aa",fontSize:".78rem"}}>{e.chapter}</td>
                    <td>{e.score}/{e.total}</td>
                    <td>
                      <div style={{display:"flex",alignItems:"center",gap:".4rem"}}>
                        <div className="pbar"><div className="pbf" style={{width:`${e.pct}%`}}/></div>
                        <span style={{fontSize:".75rem",color:e.pct>=80?"#4ade80":e.pct>=60?"#fbbf24":"#f87171"}}>{e.pct}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      }
    </div>
  );
}

/* ── LEADERBOARD ── */
function LeaderboardView({leaderboard}){
  const sorted=[...leaderboard].sort((a,b)=>b.pct-a.pct);
  const medals=["🥇","🥈","🥉"];
  return(
    <div>
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".88rem",marginBottom:".8rem"}}>🏆 Top Performers</div>
      {sorted.length===0
        ? <div className="empty"><div className="emi">🏆</div>No quiz attempts yet. Students need to complete quizzes first.</div>
        : <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.08)",borderRadius:"15px",overflow:"hidden"}}>
            <table className="lb">
              <thead><tr><th>Rank</th><th>Student</th><th>Subject</th><th>Chapter</th><th>Score</th><th>%</th></tr></thead>
              <tbody>
                {sorted.map((e,i)=>(
                  <tr key={i}>
                    <td style={{fontSize:"1rem"}}>{medals[i]||i+1}</td>
                    <td style={{fontWeight:600}}>{e.student}</td>
                    <td><span style={{color:SUBJECTS[e.subject]?.color||"#818cf8",fontSize:".78rem"}}>{SUBJECTS[e.subject]?.icon} {e.subject}</span></td>
                    <td style={{color:"#7777aa",fontSize:".78rem"}}>{e.chapter}</td>
                    <td style={{fontWeight:600}}>{e.score}/{e.total}</td>
                    <td>
                      <div style={{display:"flex",alignItems:"center",gap:".4rem"}}>
                        <div className="pbar"><div className="pbf" style={{width:`${e.pct}%`}}/></div>
                        <span style={{fontSize:".75rem",fontWeight:700,
                          color:e.pct>=80?"#4ade80":e.pct>=60?"#fbbf24":"#f87171"}}>{e.pct}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      }
    </div>
  );
}

/* ═══ STUDENT PANEL ═══ */
const BLANK_QUIZ = { subj:null, chap:null, qs:[], idx:0, answers:[], picked:null, shown:false, tLeft:QUIZ_SECS };

function StudentPanel({user,questions,leaderboard,addScore,onLogout}){
  const [view,setView]   = useState("subjects");
  const [nav,setNav]     = useState({subj:null});        // for chapters nav
  const [quiz,setQuiz]   = useState(BLANK_QUIZ);
  const tref             = useRef(null);

  // ── timer ──
  useEffect(()=>{
    clearInterval(tref.current);
    if(view!=="quiz" || quiz.shown) return;
    tref.current = setInterval(()=>{
      setQuiz(q=>{
        if(q.tLeft<=1){ clearInterval(tref.current); return {...q, tLeft:0, shown:true}; }
        return {...q, tLeft:q.tLeft-1};
      });
    },1000);
    return()=>clearInterval(tref.current);
  // eslint-disable-next-line
  },[view, quiz.idx, quiz.shown]);

  const startQuiz=(subj,chap)=>{
    const pool=shuffle(questions.filter(x=>x.subject===subj && x.chapter===chap));
    if(!pool.length) return;
    clearInterval(tref.current);
    // single atomic state update — no intermediate renders
    setQuiz({ subj, chap, qs:pool, idx:0, answers:[], picked:null, shown:false, tLeft:QUIZ_SECS });
    setView("quiz");
  };

  const pick=(i)=>{
    if(quiz.shown) return;
    clearInterval(tref.current);
    setQuiz(q=>({...q, picked:i, shown:true}));
  };

  const next=()=>{
    const {qs,idx,answers,picked,subj,chap}=quiz;
    const na=[...answers,{picked, correct:qs[idx].correct}];
    if(idx+1 < qs.length){
      clearInterval(tref.current);
      setQuiz(q=>({...q, idx:idx+1, answers:na, picked:null, shown:false, tLeft:QUIZ_SECS}));
    } else {
      const sc=na.filter(a=>a.picked===a.correct).length;
      addScore({student:user.name,subject:subj,chapter:chap,score:sc,total:qs.length,pct:Math.round(sc/qs.length*100)});
      setQuiz(q=>({...q, answers:na}));
      setView("result");
    }
  };

  const {qs,idx,answers,picked,shown,tLeft,subj:selSubj,chap:selChap}=quiz;
  const curQ   = qs[idx] || null;
  const score  = answers.filter(a=>a.picked===a.correct).length;
  const pct    = qs.length ? Math.round(score/qs.length*100) : 0;
  const medal  = pct>=80?"🏆":pct>=60?"👍":pct>=40?"📚":"💪";
  const msg    = pct>=80?"Excellent! You're CA ready!":pct>=60?"Good job! Keep revising.":pct>=40?"Nice try! Practice more.":"Keep going! You'll get there.";
  const R=18, C=2*Math.PI*R, dash=C*((QUIZ_SECS-tLeft)/QUIZ_SECS);
  const tc     = tLeft<=5?"#ef4444":tLeft<=10?"#f59e0b":"#6366f1";

  const chapQCount=(s,c)=>questions.filter(x=>x.subject===s&&x.chapter===c).length;

  return(
    <div>
      <div className="topbar">
        <div className="tb-logo">CA Foundation Quiz</div>
        <div className="tb-user">{user.avatar} {user.name}</div>
        <div className="tb-r">
          {view!=="subjects"&&<button className="ghost" onClick={()=>{
            clearInterval(tref.current);
            if(view==="chapters") setView("subjects");
            else { setView("chapters"); }
          }}>← Back</button>}
          <button className="ghost" onClick={()=>{clearInterval(tref.current);onLogout();}}>Logout</button>
        </div>
      </div>
      <div className="page">

        {/* SUBJECTS */}
        {view==="subjects"&&<>
          <div className="pg-h">Hello, {user.name}! 👋</div>
          <div className="pg-s">Choose a subject to practice for CA Foundation</div>
          <div className="subj-grid">
            {Object.entries(SUBJECTS).map(([s,info])=>{
              const n=questions.filter(x=>x.subject===s).length;
              return(
                <div key={s} className="subj-card" style={{background:`${info.color}10`,borderColor:`${info.color}25`}}
                  onClick={()=>{setNav({subj:s});setView("chapters");}}>
                  <div className="subj-icon">{info.icon}</div>
                  <div className="subj-name" style={{color:info.color}}>{s}</div>
                  <div className="subj-cnt">{n} question{n!==1?"s":""} across {SUBJECTS[s].chapters.filter(c=>chapQCount(s,c)>0).length} chapters</div>
                </div>
              );
            })}
          </div>
          {leaderboard.length>0&&<>
            <div style={{height:"1px",background:"rgba(255,255,255,.07)",margin:"1.2rem 0"}}/>
            <div className="pg-h" style={{fontSize:"1.2rem",marginBottom:".2rem"}}>🏆 Leaderboard</div>
            <div className="pg-s" style={{marginBottom:"1rem"}}>Top performers</div>
            <LeaderboardView leaderboard={leaderboard}/>
          </>}
        </>}

        {/* CHAPTERS */}
        {view==="chapters"&&nav.subj&&<>
          <div className="bk" onClick={()=>setView("subjects")}>← {nav.subj}</div>
          <div className="pg-h">{SUBJECTS[nav.subj].icon} {nav.subj}</div>
          <div className="pg-s">Select a chapter to start your quiz</div>
          <div className="ch-list">
            {SUBJECTS[nav.subj].chapters.map(c=>{
              const n=chapQCount(nav.subj,c);
              return(
                <div key={c} className="ch-row" style={{cursor:n>0?"pointer":"default",opacity:n>0?1:.5}}
                  onClick={()=>{ if(n>0) startQuiz(nav.subj,c); }}>
                  <div>
                    <div className="ch-name">{c}</div>
                    <div className="ch-cnt">{n>0?`${n} question${n!==1?"s":""}`:"No questions yet"}</div>
                  </div>
                  {n>0&&<button className="start-btn" onClick={e=>{e.stopPropagation();startQuiz(nav.subj,c);}}>Start Quiz →</button>}
                </div>
              );
            })}
          </div>
        </>}

        {/* QUIZ */}
        {view==="quiz"&&curQ&&<div className="qwrap">
          <div style={{fontSize:".8rem",color:"#7777aa",marginBottom:".5rem"}}>{SUBJECTS[selSubj]?.icon} {selSubj} · {selChap}</div>
          <div className="qhdr">
            <div className="qctr">Q {idx+1}</div>
            <div className="prog"><div className="pfill" style={{width:`${((idx+(shown?1:0))/qs.length)*100}%`}}/></div>
            <div className="qctr">{qs.length} Qs</div>
            <div className="tring">
              <svg className="tsvg" width="44" height="44" viewBox="0 0 44 44">
                <circle cx="22" cy="22" r={R} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="3"/>
                <circle cx="22" cy="22" r={R} fill="none" stroke={tc} strokeWidth="3"
                  strokeDasharray={C} strokeDashoffset={dash} strokeLinecap="round"
                  style={{transition:"stroke-dashoffset .9s linear,stroke .3s"}}/>
              </svg>
              <div className="tnum" style={{color:tc}}>{tLeft}</div>
            </div>
          </div>
          <div className="qbox">
            <div className="qtext">{curQ.q}</div>
            <div className="qopts">
              {curQ.opts.map((o,i)=>{
                let cl="qopt";
                if(shown){ cl+=" dn"; if(i===curQ.correct) cl+=" ok"; else if(i===picked) cl+=" wr"; }
                else if(i===picked) cl+=" sl";
                return <button key={i} className={cl} onClick={()=>pick(i)}><span className="olt">{["A","B","C","D"][i]}</span>{o}</button>;
              })}
            </div>
            <div className="cf">{shown&&<button className="nxt" onClick={next}>{idx+1<qs.length?"Next →":"Results →"}</button>}</div>
          </div>
        </div>}

        {/* RESULT */}
        {view==="result"&&<div className="res">
          <div style={{fontSize:"2.5rem",marginBottom:"1rem"}}>{medal}</div>
          <div className="sring"><div className="snum">{score}</div><div className="stot">out of {qs.length}</div></div>
          <div className="rh">{score===qs.length?"Perfect Score! 🎉":`You scored ${score}/${qs.length}`}</div>
          <div className="rm">{msg} &nbsp;·&nbsp; {pct}%</div>
          <div className="rstats">
            <div className="sc"><div className="sv" style={{color:"#4ade80"}}>{score}</div><div className="sl">Correct</div></div>
            <div className="sc"><div className="sv" style={{color:"#ef4444"}}>{qs.length-score}</div><div className="sl">Wrong</div></div>
            <div className="sc"><div className="sv">{pct}%</div><div className="sl">Score</div></div>
          </div>
          <div className="revl">
            {qs.map((item,i)=>{
              const a=answers[i];
              const ok=a&&a.picked!=null&&a.picked===a.correct;
              const yourAns=a&&a.picked!=null?item.opts[a.picked]:"Time up";
              return(
                <div key={item.id} className="revi">
                  <div style={{fontSize:"1rem",flexShrink:0,marginTop:"2px"}}>{ok?"✅":"❌"}</div>
                  <div>
                    <div className="rq">{item.q}</div>
                    <div className="ra">{ok?`Correct: ${item.opts[item.correct]}`:`Your answer: ${yourAns} · Correct: ${item.opts[item.correct]}`}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{marginTop:"1.6rem"}}>
            <button className="outbtn" onClick={()=>startQuiz(selSubj,selChap)}>🔁 Retry</button>
            <button className="outbtn" onClick={()=>setView("chapters")}>📖 Chapters</button>
            <button className="outbtn" onClick={()=>setView("subjects")}>🏠 Subjects</button>
          </div>
        </div>}

      </div>
    </div>
  );
}
