-- CreateTable
CREATE TABLE "account" (
    "account_no" TEXT NOT NULL,
    "balance" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("account_no")
);

-- CreateTable
CREATE TABLE "bank" (
    "b_name" VARCHAR(255) NOT NULL,
    "bank_id" TEXT NOT NULL,

    CONSTRAINT "bank_pkey" PRIMARY KEY ("bank_id")
);

-- CreateTable
CREATE TABLE "branch" (
    "br_code" INTEGER NOT NULL,
    "br_name" VARCHAR(255) NOT NULL,
    "state" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "bank_id" TEXT NOT NULL,

    CONSTRAINT "branch_pkey" PRIMARY KEY ("br_code")
);

-- CreateTable
CREATE TABLE "credit_card" (
    "cr_id" TEXT NOT NULL,
    "exp_date" DATE NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "cr_limit" DECIMAL(10,2) NOT NULL,
    "account_no" TEXT NOT NULL,

    CONSTRAINT "credit_card_pkey" PRIMARY KEY ("cr_id")
);

-- CreateTable
CREATE TABLE "customer" (
    "cust_id" SERIAL NOT NULL,
    "pincode" INTEGER NOT NULL,
    "state" VARCHAR(255) NOT NULL,
    "f_name" VARCHAR(255) NOT NULL,
    "l_name" VARCHAR(255) NOT NULL,
    "bank_id" TEXT NOT NULL,
    "account_no" TEXT NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("cust_id")
);

-- CreateTable
CREATE TABLE "customer_mobile_no" (
    "mobile_no" VARCHAR(10) NOT NULL,
    "cust_id" INTEGER NOT NULL,

    CONSTRAINT "customer_mobile_no_pkey" PRIMARY KEY ("mobile_no","cust_id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "feedback_no" SERIAL NOT NULL,
    "date_of_feedback" DATE NOT NULL,
    "feedback_given" VARCHAR(255) NOT NULL,
    "cust_id" INTEGER NOT NULL,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("feedback_no")
);

-- CreateTable
CREATE TABLE "loan" (
    "loan_id" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "cust_id" INTEGER NOT NULL,

    CONSTRAINT "loan_pkey" PRIMARY KEY ("loan_id")
);

-- CreateTable
CREATE TABLE "payment" (
    "payment_no" SERIAL NOT NULL,
    "payment_date" DATE NOT NULL,
    "payment_amt" DECIMAL(10,2) NOT NULL,
    "loan_id" TEXT NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("payment_no","loan_id")
);

-- CreateTable
CREATE TABLE "transaction_s" (
    "t_type" VARCHAR(255) NOT NULL,
    "t_id" TEXT NOT NULL,
    "tr_date" DATE NOT NULL,
    "borrow_amt" DECIMAL(10,2) NOT NULL,
    "withdraw_amt" DECIMAL(10,2) NOT NULL,
    "deposit_amt" DECIMAL(10,2) NOT NULL,
    "account_no" TEXT NOT NULL,

    CONSTRAINT "transaction_s_pkey" PRIMARY KEY ("t_id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "cust_id" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usersdetails" (
    "refresh_token" VARCHAR(255),
    "access_token" VARCHAR(255),
    "expires_at" INTEGER,
    "token_type" VARCHAR(255),
    "scope" VARCHAR(255),
    "id_token" VARCHAR(255),
    "session_state" VARCHAR(255),
    "id" INTEGER NOT NULL,

    CONSTRAINT "usersdetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_email_token_key" ON "VerificationToken"("email", "token");

-- AddForeignKey
ALTER TABLE "branch" ADD CONSTRAINT "branch_bank_id_fkey" FOREIGN KEY ("bank_id") REFERENCES "bank"("bank_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "credit_card" ADD CONSTRAINT "credit_card_account_no_fkey" FOREIGN KEY ("account_no") REFERENCES "account"("account_no") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_account_no_fkey" FOREIGN KEY ("account_no") REFERENCES "account"("account_no") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_bank_id_fkey" FOREIGN KEY ("bank_id") REFERENCES "bank"("bank_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "customer_mobile_no" ADD CONSTRAINT "customer_mobile_no_cust_id_fkey" FOREIGN KEY ("cust_id") REFERENCES "customer"("cust_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "__cust_id_fkey" FOREIGN KEY ("cust_id") REFERENCES "customer"("cust_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "loan" ADD CONSTRAINT "loan_cust_id_fkey" FOREIGN KEY ("cust_id") REFERENCES "customer"("cust_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_loan_id_fkey" FOREIGN KEY ("loan_id") REFERENCES "loan"("loan_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transaction_s" ADD CONSTRAINT "transaction_s_account_no_fkey" FOREIGN KEY ("account_no") REFERENCES "account"("account_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_cust_id_fkey" FOREIGN KEY ("cust_id") REFERENCES "customer"("cust_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersdetails" ADD CONSTRAINT "usersdetails_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
