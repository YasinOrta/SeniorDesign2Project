IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240423090955_v1'
)
BEGIN
    CREATE TABLE [users] (
        [Id] int NOT NULL IDENTITY,
        [FirstName] nvarchar(max) NOT NULL,
        [LastName] nvarchar(max) NOT NULL,
        [Username] nvarchar(max) NOT NULL,
        [Password] nvarchar(max) NOT NULL,
        [Token] nvarchar(max) NOT NULL,
        [Role] nvarchar(max) NOT NULL,
        [Email] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_users] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240423090955_v1'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240423090955_v1', N'8.0.4');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240501083615_v2'
)
BEGIN
    CREATE TABLE [logs] (
        [Id] int NOT NULL IDENTITY,
        [LogDetail] nvarchar(max) NOT NULL,
        [Username] nvarchar(max) NOT NULL,
        [Role] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_logs] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240501083615_v2'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240501083615_v2', N'8.0.4');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240501085529_v3'
)
BEGIN
    ALTER TABLE [logs] ADD [UserId] nvarchar(max) NOT NULL DEFAULT N'';
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240501085529_v3'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240501085529_v3', N'8.0.4');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240502072625_LogUpdate'
)
BEGIN
    EXEC sp_rename N'[logs].[UserId]', N'Token', N'COLUMN';
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240502072625_LogUpdate'
)
BEGIN
    ALTER TABLE [logs] ADD [DateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240502072625_LogUpdate'
)
BEGIN
    ALTER TABLE [logs] ADD [Email] nvarchar(max) NOT NULL DEFAULT N'';
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240502072625_LogUpdate'
)
BEGIN
    ALTER TABLE [logs] ADD [FirstName] nvarchar(max) NOT NULL DEFAULT N'';
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240502072625_LogUpdate'
)
BEGIN
    ALTER TABLE [logs] ADD [LastName] nvarchar(max) NOT NULL DEFAULT N'';
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240502072625_LogUpdate'
)
BEGIN
    ALTER TABLE [logs] ADD [Password] nvarchar(max) NOT NULL DEFAULT N'';
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240502072625_LogUpdate'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240502072625_LogUpdate', N'8.0.4');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240502151754_v4'
)
BEGIN
    ALTER TABLE [logs] ADD [OperationType] nvarchar(max) NOT NULL DEFAULT N'';
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240502151754_v4'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240502151754_v4', N'8.0.4');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240503105837_v5'
)
BEGIN
    CREATE TABLE [middlewareLogs] (
        [Id] int NOT NULL IDENTITY,
        [Request] nvarchar(max) NOT NULL,
        [RequestDetail] nvarchar(max) NOT NULL,
        [Response] nvarchar(max) NOT NULL,
        [ResponseDetail] nvarchar(max) NOT NULL,
        [ResponseStatusCode] int NOT NULL,
        CONSTRAINT [PK_middlewareLogs] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240503105837_v5'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240503105837_v5', N'8.0.4');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240503124741_v7'
)
BEGIN
    DECLARE @var0 sysname;
    SELECT @var0 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[middlewareLogs]') AND [c].[name] = N'RemotePort');
    IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [middlewareLogs] DROP CONSTRAINT [' + @var0 + '];');
    ALTER TABLE [middlewareLogs] ALTER COLUMN [RemotePort] nvarchar(max) NOT NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240503124741_v7'
)
BEGIN
    DECLARE @var1 sysname;
    SELECT @var1 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[middlewareLogs]') AND [c].[name] = N'RemoteIpAddress');
    IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [middlewareLogs] DROP CONSTRAINT [' + @var1 + '];');
    ALTER TABLE [middlewareLogs] ALTER COLUMN [RemoteIpAddress] nvarchar(max) NOT NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240503124741_v7'
)
BEGIN
    DECLARE @var2 sysname;
    SELECT @var2 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[middlewareLogs]') AND [c].[name] = N'LocalPort');
    IF @var2 IS NOT NULL EXEC(N'ALTER TABLE [middlewareLogs] DROP CONSTRAINT [' + @var2 + '];');
    ALTER TABLE [middlewareLogs] ALTER COLUMN [LocalPort] nvarchar(max) NOT NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240503124741_v7'
)
BEGIN
    DECLARE @var3 sysname;
    SELECT @var3 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[middlewareLogs]') AND [c].[name] = N'LocalIpAddress');
    IF @var3 IS NOT NULL EXEC(N'ALTER TABLE [middlewareLogs] DROP CONSTRAINT [' + @var3 + '];');
    ALTER TABLE [middlewareLogs] ALTER COLUMN [LocalIpAddress] nvarchar(max) NOT NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240503124741_v7'
)
BEGIN
    DECLARE @var4 sysname;
    SELECT @var4 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[middlewareLogs]') AND [c].[name] = N'ConnectionId');
    IF @var4 IS NOT NULL EXEC(N'ALTER TABLE [middlewareLogs] DROP CONSTRAINT [' + @var4 + '];');
    ALTER TABLE [middlewareLogs] ALTER COLUMN [ConnectionId] nvarchar(max) NOT NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240503124741_v7'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240503124741_v7', N'8.0.4');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240506131745_v8.1'
)
BEGIN
    CREATE TABLE [cities] (
        [Id] int NOT NULL IDENTITY,
        [CityId] int NOT NULL,
        [CityName] nvarchar(max) NOT NULL,
        [CityLocation] nvarchar(max) NOT NULL,
        [DistrictId] int NOT NULL,
        [DistrictName] nvarchar(max) NOT NULL,
        [DistrictAbout] nvarchar(max) NOT NULL,
        [DistrictLocation] nvarchar(max) NOT NULL,
        [DistrictImgUrl] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_cities] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240506131745_v8.1'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240506131745_v8.1', N'8.0.4');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240507144432_v8.3'
)
BEGIN
    DECLARE @var5 sysname;
    SELECT @var5 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[cities]') AND [c].[name] = N'DistrictId');
    IF @var5 IS NOT NULL EXEC(N'ALTER TABLE [cities] DROP CONSTRAINT [' + @var5 + '];');
    ALTER TABLE [cities] ALTER COLUMN [DistrictId] nvarchar(max) NOT NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240507144432_v8.3'
)
BEGIN
    DECLARE @var6 sysname;
    SELECT @var6 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[cities]') AND [c].[name] = N'CityId');
    IF @var6 IS NOT NULL EXEC(N'ALTER TABLE [cities] DROP CONSTRAINT [' + @var6 + '];');
    ALTER TABLE [cities] ALTER COLUMN [CityId] nvarchar(max) NOT NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240507144432_v8.3'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240507144432_v8.3', N'8.0.4');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240508140518_v9'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240508140518_v9', N'8.0.4');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240508140801_v9.0.1'
)
BEGIN
    CREATE TABLE [provinces] (
        [Id] int NOT NULL IDENTITY,
        [Name] nvarchar(max) NOT NULL,
        [Vehicle_Registration_Plate] nvarchar(max) NOT NULL,
        [Region_Location] nvarchar(max) NOT NULL,
        [PopularFoods] nvarchar(max) NOT NULL,
        [PopularProducedItems] nvarchar(max) NOT NULL,
        [Population] int NOT NULL,
        [IsCapitalCity] bit NOT NULL,
        [imgUrl] nvarchar(max) NOT NULL,
        [About] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_provinces] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240508140801_v9.0.1'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240508140801_v9.0.1', N'8.0.4');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240514113013_v9.2'
)
BEGIN
    DECLARE @var7 sysname;
    SELECT @var7 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[provinces]') AND [c].[name] = N'Population');
    IF @var7 IS NOT NULL EXEC(N'ALTER TABLE [provinces] DROP CONSTRAINT [' + @var7 + '];');
    ALTER TABLE [provinces] ALTER COLUMN [Population] nvarchar(max) NOT NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240514113013_v9.2'
)
BEGIN
    DECLARE @var8 sysname;
    SELECT @var8 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[provinces]') AND [c].[name] = N'IsCapitalCity');
    IF @var8 IS NOT NULL EXEC(N'ALTER TABLE [provinces] DROP CONSTRAINT [' + @var8 + '];');
    ALTER TABLE [provinces] ALTER COLUMN [IsCapitalCity] nvarchar(max) NOT NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240514113013_v9.2'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240514113013_v9.2', N'8.0.4');
END;
GO

COMMIT;
GO

