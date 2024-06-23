-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateTable
CREATE TABLE "auth"."Profile" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BillingAccount" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" VARCHAR(255) NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "stripeCustomerId" VARCHAR(255),
    "stripeSubscriptionId" VARCHAR(255),
    "private" BOOLEAN NOT NULL DEFAULT false,
    "subscriptionUsageId" VARCHAR(255),
    "appIds" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "BillingAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DocumentUpload" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "url" VARCHAR(255) NOT NULL,

    CONSTRAINT "DocumentUpload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Feedback" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" VARCHAR(255) NOT NULL,
    "runId" VARCHAR(255) NOT NULL,
    "feedback" VARCHAR(255) NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Notification" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" VARCHAR(255) NOT NULL,
    "message" VARCHAR(255) NOT NULL,
    "entityId" VARCHAR(255) NOT NULL,
    "entityKey" VARCHAR(255) NOT NULL,
    "entityAction" VARCHAR(255) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ChatUsage" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" VARCHAR(255) NOT NULL,
    "projectId" VARCHAR(255),
    "objectiveId" VARCHAR(255),
    "runId" VARCHAR(255),
    "model" VARCHAR(255) NOT NULL,
    "content" JSONB NOT NULL DEFAULT '{}',
    "messages" JSONB NOT NULL DEFAULT '[]',
    "promptTokens" INTEGER NOT NULL,
    "promptTime" REAL NOT NULL,
    "completionTokens" INTEGER NOT NULL,
    "completionTime" REAL NOT NULL,
    "totalTokens" INTEGER NOT NULL,
    "totalTime" REAL NOT NULL,
    "totalCost" REAL NOT NULL,

    CONSTRAINT "ChatUsage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Prompt" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "template" VARCHAR(255) NOT NULL,

    CONSTRAINT "Prompt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cycle" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" VARCHAR(255) NOT NULL,
    "projectId" VARCHAR(255) NOT NULL,
    "quarter" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "Cycle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Label" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" VARCHAR(255) NOT NULL,
    "projectId" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "color" VARCHAR(255) NOT NULL,

    CONSTRAINT "Label_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."KeyResult" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" VARCHAR(255) NOT NULL,
    "projectId" VARCHAR(255) NOT NULL,
    "objectiveId" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "value" REAL NOT NULL,

    CONSTRAINT "KeyResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Chat" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" VARCHAR(255) NOT NULL,
    "projectId" VARCHAR(255),
    "title" VARCHAR(255) NOT NULL,
    "path" VARCHAR(255) NOT NULL,
    "messages" JSONB NOT NULL DEFAULT '[]',
    "sharePath" VARCHAR(255),

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Objective" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastRunAt" TIMESTAMP,
    "userId" VARCHAR(255) NOT NULL,
    "projectId" VARCHAR(255) NOT NULL,
    "outcome" VARCHAR(255) NOT NULL,
    "interval" VARCHAR(255) NOT NULL,
    "progress" INTEGER NOT NULL,
    "labelId" VARCHAR(255),
    "parentId" VARCHAR(255),
    "cycleId" VARCHAR(255),

    CONSTRAINT "Objective_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Run" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" VARCHAR(255) NOT NULL,
    "projectId" VARCHAR(255) NOT NULL,
    "objectiveId" VARCHAR(255) NOT NULL,
    "completedAt" TIMESTAMP,
    "inngestIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "status" VARCHAR(255) NOT NULL,
    "tasks" JSONB NOT NULL DEFAULT '[]',
    "outputUrl" VARCHAR(255) NOT NULL,
    "sharePath" VARCHAR(255),

    CONSTRAINT "Run_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Project" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(512) NOT NULL,
    "vision" VARCHAR(2048) NOT NULL,
    "strategy" VARCHAR(2048) NOT NULL,
    "budget" REAL NOT NULL,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "resourceIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "memberIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "contractAddress" TEXT,
    "ipfsUri" TEXT,
    "sharePath" VARCHAR(255),

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "auth"."Profile"("email");
